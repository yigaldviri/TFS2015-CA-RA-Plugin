"use strict";

export class DeploymentResult {
    static ACTIVE: string = "Active";
    static CANCELLED_DEPLOYMENT: string = "Canceled";
    static FAILURE: string = "Failed";
    static SUCCESS: string = "Succeeded";

    public static  isFinal(currentState: string): boolean {
        return DeploymentResult.ACTIVE !== currentState;
    }
}