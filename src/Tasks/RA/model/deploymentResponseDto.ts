"use strict";
import {Utils} from "../utils/utils";

export class DeploymentResponseDto {
    private id: number;
    private description: string;
    private result: boolean;
    private envId: number;
    private envName: string;

    constructor () {};

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

    getEnvId(): number {
        return this.envId;
    }

    setEnvId(value: number) {
        this.envId = value;
    }

    getEnvName(): string {
        return this.envName;
    }

    setEnvName(value: string) {
        this.envName = value;
    }

    static fromJson (json: any): DeploymentResponseDto {
        var res: DeploymentResponseDto = new DeploymentResponseDto();
        if (!Utils.isArray(json)) {
            res.setResult(json.result);
            res.setDescription(json.description);
            return res;
        }

        var first = json[0]; // this iteration we support only one environment
        res.setId(first.id);
        res.setDescription(first.description);
        res.setResult(first.result);
        res.setEnvId(first.envId);
        res.setEnvName(first.envName);
        return res;
    }
}