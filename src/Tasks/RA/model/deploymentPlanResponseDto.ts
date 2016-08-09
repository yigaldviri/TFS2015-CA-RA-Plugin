import {DeploymentResponseDto} from "./deploymentResponseDto";
"use strict";
import {Utils} from "../utils/utils";

export class DeploymentPlanResponseDto {
    private description: string;
    private result: boolean;
    private deploymentPlanId: number;
    private deploymentPlanName: string;
    private deploymentResults: DeploymentResponseDto; // currently only one

    constructor () {};

    getDescription(): string {
        return this.description;
    }

    setDescription(value: string) {
        this.description = value;
    }

    getResult(): boolean {
        return this.result;
    }

    setResult(value: boolean) {
        this.result = value;
    }

    getDeploymentPlanId(): number {
        return this.deploymentPlanId;
    }

    setDeploymentPlanId(value: number) {
        this.deploymentPlanId = value;
    }

    getDeploymentPlanName(): string {
        return this.deploymentPlanName;
    }

    setDeploymentPlanName(value: string) {
        this.deploymentPlanName = value;
    }

    getDeploymentResults(): DeploymentResponseDto {
        return this.deploymentResults;
    }

    setDeploymentResults(value: DeploymentResponseDto) {
        this.deploymentResults = value;
    }

    static fromJson (json: any): DeploymentPlanResponseDto {
        var res: DeploymentPlanResponseDto = new DeploymentPlanResponseDto();
        res.setDescription(json.description);
        res.setResult(json.result);
        res.setDeploymentPlanId(json.deploymentPlanId);
        res.setDeploymentPlanName(json.deploymentPlanName);
        if (json.deploymentResults) { // maybe creation failed and there's no deployment
            res.setDeploymentResults(DeploymentResponseDto.fromJson(json.deploymentResults));
        }
        return res;
    }
}