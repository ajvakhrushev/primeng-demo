import { Injectable } from "@angular/core";

@Injectable()
export class AppService {
    deepCopy(data: any): any {
        return JSON.parse(JSON.stringify(data));
    }
} 