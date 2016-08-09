"use strict";
import * as tl from "vsts-task-lib/task";
import {TaskResult} from "vso-node-api/interfaces/BuildInterfaces";
import {Utils} from "../utils/utils";
import {UserInputs} from "../model/userInputs";
import {DeploymentResponseDto} from "../model/deploymentResponseDto";
import {DPStrategy, RAConstants} from "../utils/constants";

export class UserInputsService {

    static initUserInputs(): UserInputs {
        tl.debug("Getting the user inputs.");
        var inputs: UserInputs = new UserInputs();
        inputs.strategy = DPStrategy.whichStrategy(tl.getInput(RAConstants.STRATEGY, true));
        this.setConnectionDetails(inputs);
        this.setCommonInputs(inputs);
        this.setStrategyInputs(inputs);
        return inputs;
    }

    private static setConnectionDetails(inputs: UserInputs) {
        var endpoint: string = tl.getInput("NAC", true);
        var credentials = tl.getEndpointAuthorization(endpoint, false)["parameters"];
        inputs.url =  tl.getEndpointUrl(endpoint, false);
        inputs.userName = credentials[RAConstants.USER_NAME];
        inputs.password = credentials[RAConstants.PASSWORD];
    };

    private static setCommonInputs(inputs) {
        inputs.deploymentPlanName = tl.getInput(RAConstants.DEPLOYMENT_PLAN_NAME, true);
        inputs.applicationName = tl.getInput(RAConstants.APPLICATION_NAME, true);
        inputs.project = tl.getInput(RAConstants.PROJECT, true);
        inputs.build = tl.getInput(RAConstants.BUILD, true);
        inputs.deploymentName = tl.getInput(RAConstants.DEPLOYMENT_NAME, true);
        inputs.deploymentStageToPerform = tl.getInput(RAConstants.STAGE_TO_PERFORM, false);
        inputs.environments.push(tl.getInput(RAConstants.ENVIRONMENTS, true));
    };

    private static setStrategyInputs(inputs: UserInputs): void {
        // these are relevant only to Scratch strategy
        if (inputs.strategy === DPStrategy.Scratch) {
            inputs.templateCategory = tl.getInput(RAConstants.TEMPLATE_CATEGORY, false);
            inputs.deploymentTemplate = tl.getInput(RAConstants.DEPLOYMENT_TEMPLATE, false);
            inputs.timeout = tl.getInput(RAConstants.TIMEOUT, false);

            this.handleOptionalFields(inputs);
        }
    }

    // these are optional so null if empty means they won't be in the DTO
    private static handleOptionalFields(inputs) {
        inputs.manifest = Utils.emptyToNull(tl.getInput(RAConstants.MANIFEST, false));
        inputs.properties = "{" + Utils.emptyToNull(tl.getInput(RAConstants.PROPERTIES, false)) + "}";
        this.setArtifacts(inputs);
    };

    private static setArtifacts(inputs) {
        var option: string = tl.getInput(RAConstants.ARTIFACT_METHOD, false);
        switch (option) {
            case RAConstants.ARTIFACT_PCK_NAME:
                inputs.artifactPackageName = Utils.emptyToNull(tl.getInput(RAConstants.ARTIFACT_PCK_NAME, false));
                break;
            case RAConstants.ARTIFACT_PCK_AS_XML:
                inputs.artifactPackageAsXML = Utils.emptyToNull(tl.getInput(RAConstants.ARTIFACT_PCK_AS_XML, false));
                break;
            default: // no artifacts.
                break;
        }
    };


}