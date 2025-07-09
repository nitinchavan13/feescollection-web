import { Injectable } from '@angular/core';


@Injectable()
export class DataService {

    storedData: any = [];

    constructor() { }

    setData(key: any, value: any) {
        localStorage.setItem(key, value);
    }

    getData(key: any) {
        return localStorage.getItem(key);
    }

    removeData(key: any) {
        localStorage.removeItem(key);
    }

    clearAllData() {
        localStorage.clear();
    }
}
