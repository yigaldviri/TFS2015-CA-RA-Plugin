"use strict";

export class Utils {

    static toStringArray(json: any): Array<string> {
        var res: Array<string> = [];
        if (this.isArray(json)) {
            json.forEach( (item: string): void => {
                res.push(item);
            });
        }
        return res;
    }

    static toPrettyError(errors: Array<string>): string {
        var pretty: string = <string>" "; // strange ts-lint thing. need to check
        errors.forEach( (item: string): void => {
            pretty = pretty + item + ". ";
        });
        return pretty;
    }

    static isArray(what): boolean {
        return Object.prototype.toString.call(what) === "[object Array]";
    }

    static emptyToNull(obg: string): string {
        return (!obg || obg == "") ? null : obg;
    }
}