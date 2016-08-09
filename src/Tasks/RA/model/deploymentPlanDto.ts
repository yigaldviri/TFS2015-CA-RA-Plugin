"use strict";
import {DeploymentDto} from "./deploymentDto";
import {UserInputs} from "./userInputs";

export class DeploymentPlanDto extends DeploymentDto {

    private templateCategory: string;
    private deploymentTemplate: string;
    private timeout: string;
    private artifactPackage: string;
    private artifactPackageAsXML: string;
    private manifest: string;
    private properties: { [key: string]: string; } = {};
    constructor() {
        super();
    }


    getTemplateCategory(): string {
        return this.templateCategory;
    }

    setTemplateCategory(value: string) {
        this.templateCategory = value;
    }

    getDeploymentTemplate(): string {
        return this.deploymentTemplate;
    }

    setDeploymentTemplate(value: string) {
        this.deploymentTemplate = value;
    }

    getTimeout(): string {
        return this.timeout;
    }

    setTimeout(value: string) {
        this.timeout = value;
    }

    getArtifactPackage(): string {
        return this.artifactPackage;
    }

    setArtifactPackage(value: string) {
        this.artifactPackage = value;
    }

    getManifest(): string {
        return this.manifest;
    }

    setManifest(value: string) {
        this.manifest = value;
    }

    getProperties(): { [key: string]: string; } {
        return this.properties;
    }

    setProperties(value: { [key: string]: string; }) {
        this.properties = value;
    }


    getArtifactPackageAsXML(): string {
        return this.artifactPackageAsXML;
    }

    setArtifactPackageAsXML(value: string) {
        this.artifactPackageAsXML = value;
    }

    static fromUserInputs(userInputs: UserInputs): DeploymentPlanDto {
        var deploymentPlanDto: DeploymentPlanDto = new DeploymentPlanDto();
        DeploymentDto.fillDeploymentDto(deploymentPlanDto, userInputs);
        deploymentPlanDto.setTemplateCategory(userInputs.templateCategory);
        deploymentPlanDto.setDeploymentTemplate(userInputs.deploymentTemplate);
        deploymentPlanDto.setTimeout(userInputs.timeout);
        deploymentPlanDto.setArtifactPackage(userInputs.artifactPackageName);
        deploymentPlanDto.setArtifactPackageAsXML(userInputs.artifactPackageAsXML);
        deploymentPlanDto.setManifest(userInputs.manifest);
        deploymentPlanDto.setProperties(JSON.parse(userInputs.properties));
        return deploymentPlanDto;
    }

}