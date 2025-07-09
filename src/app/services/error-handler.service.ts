import { ErrorHandler, Injectable, Injector } from '@angular/core';
// import { UNAUTHORIZED, BAD_REQUEST, FORBIDDEN } from 'http-status-codes';
import { Router } from '@angular/router';

@Injectable()
export class YoupiErrorHandler implements ErrorHandler {
    constructor(private injector: Injector) { }
    public handleError(error: any) {
        console.log(error);
    }
}
