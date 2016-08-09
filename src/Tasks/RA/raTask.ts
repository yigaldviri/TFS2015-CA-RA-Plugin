/// <reference path="../../../typings/tsd.d.ts" />
"use strict";
import * as tl from "vsts-task-lib/task";
import {Options} from "request";

import {UserInputs} from "./model/userInputs";
import {Utils} from "./utils/utils";
import {HttpUtils} from "./utils/httpUtils";
import {ApiService} from "./services/apiService";
import {UserInputsService} from "./services/userInputsService";
import {DPStrategy} from "./utils/constants";

export class RaTask {

    static userInputs: UserInputs;

    public static run(): void {
        tl.debug("Started running RA Run Deployment task.");
        this.userInputs = UserInputsService.initUserInputs();
        var service: ApiService = new ApiService();

        var httpOptions: Options;
        if (this.userInputs.strategy === DPStrategy.Existing) {
            tl.debug("Running deployment out of an existing deployment plan.");
            httpOptions = HttpUtils.createDeploymentRequestOptions(this.userInputs);
            service.runDeployment(httpOptions);
        } else {
            tl.debug("Running deployment plan from scratch.");
            httpOptions = HttpUtils.createDeploymentPlanRequestOptions(this.userInputs);
            service.runDeploymentPlan(httpOptions);
        }
    }


}