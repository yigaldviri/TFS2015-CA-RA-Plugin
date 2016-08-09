"use strict";
import {DPStrategy} from "../utils/constants";

/**
 * This object will hold all of the available inputs from the extension.
 * Will be extended next iteration.
 */
export class UserInputs {

    private _strategy: DPStrategy;
    private _url: string;
    private _userName: string;
    private _password: string;
    private _deploymentPlanName: string;
    private _applicationName: string;
    private _project: string;
    private _build: string;
    private _deploymentName: string;
    private _environments: Array<string> = [];
    private _deploymentStageToPerform: string;

    // these are in Scratch mode only
    private _templateCategory: string;
    private _deploymentTemplate: string;
    private _timeout: string;
    private _artifactPackageName: string;
    private _artifactPackageAsXML: string;
    private _manifest: string;
    private _properties: string;

    constructor() {}

    get strategy(): DPStrategy {
        return this._strategy;
    }

    set strategy(strategy: DPStrategy) {
        this._strategy = strategy;
    }

    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this._url = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }
    get userName(): string {
        return this._userName;
    }

    set userName(value: string) {
        this._userName = value;
    }

    get applicationName(): string {
        return this._applicationName;
    }

    set applicationName(value: string) {
        this._applicationName = value;
    }


    get deploymentPlanName(): string {
        return this._deploymentPlanName;
    }

    set deploymentPlanName(value: string) {
        this._deploymentPlanName = value;
    }

    get project(): string {
        return this._project;
    }

    set project(value: string) {
        this._project = value;
    }

    get build(): string {
        return this._build;
    }

    set build(value: string) {
        this._build = value;
    }

    get deploymentName(): string {
        return this._deploymentName;
    }

    set deploymentName(value: string) {
        this._deploymentName = value;
    }

    get environments(): string[] {
        return this._environments;
    }

    set environments(value: string[]) {
        this._environments = value;
    }

    get deploymentStageToPerform(): string {
        return this._deploymentStageToPerform;
    }

    set deploymentStageToPerform(deploymentStageToPerform: string) {
        this._deploymentStageToPerform = deploymentStageToPerform;
    }

    get templateCategory(): string {
        return this._templateCategory;
    }

    set templateCategory(templateCategory: string) {
        this._templateCategory = templateCategory;
    }

    get deploymentTemplate(): string {
        return this._deploymentTemplate;
    }

    set deploymentTemplate(deploymentTemplate: string) {
        this._deploymentTemplate = deploymentTemplate;
    }

    get timeout(): string {
        return this._timeout;
    }

    set timeout(timeout: string) {
        this._timeout = timeout;
    }

    get artifactPackageName(): string {
        return this._artifactPackageName;
    }

    set artifactPackageName(artifactPackageName: string) {
        this._artifactPackageName = artifactPackageName;
    }


    get artifactPackageAsXML(): string {
        return this._artifactPackageAsXML;
    }

    set artifactPackageAsXML(artifactPackageAsXML: string) {
        this._artifactPackageAsXML = artifactPackageAsXML;
    }


    get manifest(): string {
        return this._manifest;
    }

    set manifest(manifest: string) {
        this._manifest = manifest;
    }


    get properties(): string {
        return this._properties;
    }

    set properties(properties: string) {
        this._properties = properties;
    }

}