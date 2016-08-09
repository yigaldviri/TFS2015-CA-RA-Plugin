import {DeploymentPlanResponseDto} from "../model/deploymentPlanResponseDto";
"use strict";

import {Utils} from "../utils/utils";
import {HttpUtils} from "../utils/httpUtils";
import * as tl from "vsts-task-lib/task";
import {TaskResult} from "vso-node-api/interfaces/BuildInterfaces";
import request = require("request");
import {Options} from "request";
import {http} from "vso-node-api/HttpClient";
import {RaTask} from "../raTask";
import {DeploymentResponseDto} from "../model/deploymentResponseDto";
import {DeploymentStatusDto} from "../model/deploymentStatusDto";
import {DeploymentResult} from "../model/deploymentResult";

export class ApiService {

    private SLEEP_TIME: number = 0; // in milis
    private INCREMENT_TIME: number = 5000; // in milis
    private MAX_TIME: number = 30000; // in milis

    constructor() {};

    runDeployment(httpOptions: Options): void {
        tl.debug("Requesting RA Server to run " + httpOptions.url + ".");
        request.post(httpOptions, this.apiCallBack((body: any) => {
            tl.debug("Analysing RA server response for running deployment.");
            var deploymentResponseDto: DeploymentResponseDto = DeploymentResponseDto.fromJson(JSON.parse(body));
            this.analyseDeploymentResponse(deploymentResponseDto);
        }));
    };

    runDeploymentPlan(httpOptions: Options): void {
        tl.debug("Requesting RA Server to run " + httpOptions.url + ".");
        request.post(httpOptions, this.apiCallBack(this.analyseDeploymentPlanResponse));
    };

    private analyseDeploymentResponse: Function = (deploymentResponseDto: DeploymentResponseDto): void => {
        var responseResult: boolean = deploymentResponseDto.getResult();
        tl.debug("Deployment creation result: " + responseResult);
        if (responseResult) { // 200 and deployment created
            tl.debug("Deployment created successfully. Monitoring deployment status.");
            this.busyWait(deploymentResponseDto.getId());
        } else { // error in Nolio logic (like wrong application or so)
            this.errorResult(deploymentResponseDto.getDescription());
        }
    };

    private analyseDeploymentPlanResponse: Function = (body: any): void => {
        tl.debug("Analysing RA server response for creating deployment plan.");
        var deploymentPlanResponseDto: DeploymentPlanResponseDto = DeploymentPlanResponseDto.fromJson(JSON.parse(body));
        var responseResult: boolean = deploymentPlanResponseDto.getResult();
        tl.debug("Deployment Plan creation result: " + responseResult);
        if (responseResult) { // 200 and deployment created
            tl.debug("Deployment Plan created successfully. Analysing deployment status.");
            this.analyseDeploymentResponse(deploymentPlanResponseDto.getDeploymentResults());
        } else { // error in Nolio logic (like wrong application or so)
            this.errorResult(deploymentPlanResponseDto.getDescription());
        }
    };

    private busyWait: Function = (deploymentId: number): void => {
        var httpOptions: Options = HttpUtils.createDeploymentStatusRequestOptions(RaTask.userInputs, deploymentId);
        this.checkDeploymentStatus(httpOptions);
    };

    private checkDeploymentStatus(httpOptions: Options): void {
        request.get(httpOptions, this.apiCallBack(this.analyseDeploymentStatusResponse));
    };

    private analyseDeploymentStatusResponse: Function = (body: any): void => {
        tl.debug("Analysing RA server response for deployment status.");
        var deploymentStatusDto: DeploymentStatusDto = DeploymentStatusDto.fromJson(JSON.parse(body));
        var responseResult: boolean = deploymentStatusDto.getResult();
        if (responseResult) { // 200 and deployment has been created
            var status: string = deploymentStatusDto.getReleaseStatus();
            var message: string = this.getDeploymentStatusMessage(deploymentStatusDto, status);
            tl.debug(message);
            if (DeploymentResult.isFinal(status)) {
                this.finaliseDeployment(deploymentStatusDto);
            } else {
                setTimeout(
                    () => {
                        this.busyWait(deploymentStatusDto.getId());
                    },
                    this.getAndIncrementTime());
            }
        } else { // error in Nolio logic
            this.errorResult(deploymentStatusDto.getDescription());
        }
    };

    private finaliseDeployment(deploymentStatusDto: DeploymentStatusDto): void {
        var releaseStatus: string = deploymentStatusDto.getReleaseStatus();
        var success: boolean = releaseStatus === DeploymentResult.SUCCESS;
        var message: string = "RA deployment " + deploymentStatusDto.getId() +
            " has ended with the status " + releaseStatus + ".";
        tl.debug(message);
        if (success) {
            tl.setResult(TaskResult.Succeeded, message);
        } else {
            this.errorResult(Utils.toPrettyError(deploymentStatusDto.getReleaseErrors()));
        }
    }

    private apiCallBack: Function = (onSuccess: Function): Function => {
        return (error: any, response: http.IncomingMessage, body: any): void => {
            if (error) { // probably error in connection
                return this.errorResult(error)(error);
            }

            var statusCode = response.statusCode.toString();
            tl.debug("RA server responded. Got status code " + statusCode + ".");

            // RA public controller always returns 200 unless the error is a connection based (like 401, 404 etc..)
            if (statusCode.startsWith("2")) {
                onSuccess(body);
            } else { // not supposed to get to here
                this.errorResult(error);
            }
        };
    };

    private errorResult(error): void {
        tl.error("ERROR! Failure reason : " + error);
        tl.setResult(TaskResult.Failed, error);
        tl.exit(1);
    };

    private getDeploymentStatusMessage(deploymentStatusDto, status): string {
        return "RA deployment with id " + deploymentStatusDto.getId() +
            " is " + status +
            " - " + deploymentStatusDto.getDescription() +
            ". Current Stage: " + deploymentStatusDto.getStage() +
            ". Stage state is " + deploymentStatusDto.getStageState();
    };

    private getAndIncrementTime(): number {
        if (this.SLEEP_TIME <= this.MAX_TIME) {
            this.SLEEP_TIME += this.INCREMENT_TIME;
        }
        tl.debug("Going busy-wait for " + this.SLEEP_TIME / 1000 + " seconds.");
        return this.SLEEP_TIME;
    }
}