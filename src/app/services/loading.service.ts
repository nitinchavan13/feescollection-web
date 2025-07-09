import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';

@Injectable()
export class LoadingService {

    private blockUIEvent = new Subject<any>();

    constructor(private spinner: NgxSpinnerService) { }

    ngOnInit() {

    }

    showSpinner() {
        this.spinner.show();
    }

    hideSpinner() {
        this.spinner.hide();
    }
}
