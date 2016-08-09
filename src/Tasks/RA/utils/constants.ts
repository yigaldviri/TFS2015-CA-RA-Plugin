"use strict";

export class RAConstants {
    // url
    public static RUN_DEPLOYMENTS_API: string = "datamanagement/a/api/v4/run-deployments";
    public static RUN_DEPLOYMENT_PLAN_API: string = "datamanagement/a/api/v4/run-deployment-plan";
    public static DEPLOYMENT_STATUS_API: string = "datamanagement/a/api/v4/release-status";

    // user inputs
    public static STRATEGY: string = "strategy";
    public static URL: string = "url";
    public static USER_NAME: string = "RAusername";
    public static PASSWORD: string = "RApassword";
    public static DEPLOYMENT_PLAN_NAME: string = "deploymentPlanName";
    public static APPLICATION_NAME: string = "applicationName";
    public static PROJECT: string = "project";
    public static BUILD: string = "build";
    public static DEPLOYMENT_NAME: string = "deploymentName";
    public static STAGE_TO_PERFORM: string = "deploymentStageToPerform";
    public static ENVIRONMENTS: string = "environments";
    public static TEMPLATE_CATEGORY: string = "templateCategory";
    public static DEPLOYMENT_TEMPLATE: string = "deploymentTemplate";
    public static TIMEOUT: string = "timeout";
    public static ARTIFACT_METHOD: string = "artifactsMethod";
    public static ARTIFACT_PCK_NAME: string = "artifactPackageName";
    public static ARTIFACT_PCK_AS_XML: string = "artifactPackageAsXML";
    public static MANIFEST: string = "manifest";
    public static PROPERTIES: string = "properties";
}

// states - are we creating deployment plan from scratch or using an existing one
export enum DPStrategy {
    Scratch,
    Existing
}

export namespace DPStrategy {
    export var whichStrategy: Function = (context: string): DPStrategy => {
        switch (context) {
            case "Run Existing Deployment Plan":
                return DPStrategy.Existing;
            default:
                return DPStrategy.Scratch;
        }
    };
}