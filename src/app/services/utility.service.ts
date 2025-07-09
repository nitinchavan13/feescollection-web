import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ObservableDataService } from './observable-data.service';
import { Router } from '@angular/router';

@Injectable()
export class UtilityService {
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    constructor(private router: Router, private observableDataService: ObservableDataService) {

    }

    getDayFromDate(date) {
        const temp = new Date(date);
        return temp.getDate();
    }

    getMonthFromDate(date) {
        const temp = new Date(date);
        return this.months[temp.getMonth()];
    }

    convertTime(time) {
        if (time === 12) {
            return time.toString() + ' PM';
        } else if (time === 24) {
            return time.toString() + ' AM';
        } else if (time < 12) {
            return time.toString() + ' AM';
        } else {
            return (time - 12).toString() + ' PM';
        }
    }

    validateNumbersOnly(event) {
        return event.keyCode >= 48 && event.keyCode <= 57;
    }

    formatDate(date) {
        const event = new Date(date);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return event.toLocaleDateString('en-in', options);
    }

    getCurrentMonthText() {
        return this.monthsFull[new Date().getMonth()];
    }
}
