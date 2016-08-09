"use strict";
import {UserInputs} from "./userInputs";

export class DeploymentDto {

    private deployment: string;
    private environments: Array<string> = []; // next iteration will become a string array
    private deploymentPlan: string;
    private project: string;
    private build: string;
    private application: string;
    private deploymentStageToPerform: string;

    constructor() {}

    getDeployment(): string {
        return this.deployment;
    }

    setDeployment(value: string) {
        this.deployment = value;
    }

    getEnvironments(): string[] {
        return this.environments;
    }

    setEnvironments(value: string[]) {
        this.environments = value;
    }

    getDeploymentPlan(): string {
        return this.deploymentPlan;
    }

    setDeploymentPlan(value: string) {
        this.deploymentPlan = value;
    }

    getProject(): string {
        return this.project;
    }

    setProject(value: string) {
        this.project = value;
    }

    getBuild(): string {
        return this.build;
    }

    setBuild(value: string) {
        this.build = value;
    }

    getApplication(): string {
        return this.application;
    }

    setApplication(value: string) {
        this.application = value;
    }

    getDeploymentStageToPerform(): string {
        return this.deploymentStageToPerform;
    }

    setDeploymentStageToPerform(deploymentStageToPerform: string) {
        this.deploymentStageToPerform = deploymentStageToPerform;
    }

    static fromUserInputs(userInputs: UserInputs): DeploymentDto {
        var deploymentDto: DeploymentDto = new DeploymentDto();
        this.fillDeploymentDto(deploymentDto, userInputs);
        return deploymentDto;
    }

    static fillDeploymentDto(deploymentDto: DeploymentDto, userInputs: UserInputs) {
        deploymentDto.setDeploymentPlan(userInputs.deploymentPlanName);
        deploymentDto.setApplication(userInputs.applicationName);
        deploymentDto.setProject(userInputs.project);
        deploymentDto.setBuild(userInputs.build);
        deploymentDto.setDeployment(userInputs.deploymentName);
        deploymentDto.setEnvironments(userInputs.environments);
        deploymentDto.setDeploymentStageToPerform(userInputs.deploymentStageToPerform);
    };

}