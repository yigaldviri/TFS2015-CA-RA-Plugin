import {Utils} from "../utils/utils";
"use strict";

export class DeploymentStatusDto {

    private id: number;
    private description: string;
    private releaseStatus: string;
    private releaseErrors: Array<string> = [];
    private result: boolean;
    private stage: string;
    private stageState: string;

    constructor() {};

    getId(): number {
        return this.id;
    }

    setId(value: number) {
        this.id = value;
    }

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

    setStageState(value: string) {
        this.stageState = value;
    }

    getStageState(): string {
        return this.stageState;
    }

    setStage(value: string) {
        this.stage = value;
    }

    getStage(): string {
        return this.stage;
    }

    setReleaseStatus(value: string) {
        this.releaseStatus = value;
    }

    getReleaseStatus(): string {
        return this.releaseStatus;
    }

    getReleaseErrors(): Array<string> {
        return this.releaseErrors;
    };

    setReleaseErrors(errors: Array<string>) {
        this.releaseErrors = errors;
    };

    static fromJson (json: any): DeploymentStatusDto {
        var res: DeploymentStatusDto = new DeploymentStatusDto();
        res.setId(json.id);
        res.setDescription(json.description);
        res.setResult(json.result);
        res.setReleaseStatus(json.releaseStatus);
        res.setStage(json.stage);
        res.setStageState(json.stageState);
        res.setReleaseErrors(Utils.toStringArray(json.releaseErrors));
        return res;
    }
}