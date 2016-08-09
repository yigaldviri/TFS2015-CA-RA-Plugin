"use strict";
import * as tl from "vsts-task-lib/task";
import {Headers} from "request";
import {UserInputs} from "../model/userInputs";
import {DeploymentDto} from "../model/deploymentDto";
import {DeploymentPlanDto} from "../model/deploymentPlanDto";
import {RAConstants} from "./constants";
import {Options} from "request";
import {AuthOptions} from "request";

export class HttpUtils {

    static createDeploymentStatusRequestOptions(userInputs: UserInputs, deploymentId: number): Options {
        var url: string = this.getURL(userInputs, RAConstants.DEPLOYMENT_STATUS_API) + "/" + deploymentId;
        tl.debug("URL for deployment status is: " + url);
        var auth: AuthOptions = this.getCredentials(userInputs);
        return <Options> {
            url: url,
            auth: auth,
        };
    };

    static createDeploymentRequestOptions(userInputs: UserInputs): Options {
        var url: string = this.getURL(userInputs, RAConstants.RUN_DEPLOYMENTS_API);
        var bodyAsJson: any = JSON.stringify(DeploymentDto.fromUserInputs(userInputs));
        tl.debug("RA URL request body is: " + bodyAsJson);
        var auth: AuthOptions = this.getCredentials(userInputs);
        var headers: Headers = <Headers> {"content-type": "application/json"};
        return <Options> {
            url: url,
            auth: auth,
            headers: headers,
            body: bodyAsJson
        };
    };

    static createDeploymentPlanRequestOptions(userInputs: UserInputs): Options {
        var url: string = this.getURL(userInputs, RAConstants.RUN_DEPLOYMENT_PLAN_API);
        var bodyAsJson: any = JSON.stringify(DeploymentPlanDto.fromUserInputs(userInputs));
        var auth: AuthOptions = this.getCredentials(userInputs);
        var headers: Headers = <Headers> {"content-type": "application/json"};
        tl.debug("RA URL request body is: " + bodyAsJson);
        return <Options> {
            url: url,
            auth: auth,
            headers: headers,
            body: bodyAsJson
        };
    };

    private static getCredentials(userInputs: UserInputs): AuthOptions {
        return <AuthOptions> {
            username: userInputs.userName,
            password: userInputs.password
        };
    };

    private static getURL(userInputs: UserInputs, suffix: string): string {
        var url: string = userInputs.url;
        var res: string = url + (url.endsWith("/") ? "" : "/") + suffix;
        tl.debug("RA URL request is: " + res);
        return res;
    };
}