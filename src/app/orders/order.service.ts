import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { IOrder } from './order';

@Injectable()
export class OrderService{
    private _orderUrl = 'api/orders/orders.json';

    constructor(private _http: Http) { }

    getOrders(): Observable<IOrder[]>{
        return this._http.get(this._orderUrl)
        .map((response: Response) => <IOrder[]> response.json())
        .do(data => console.log('All: ' + JSON.stringify(data)))
        .catch(this.handleError);
    }

    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}