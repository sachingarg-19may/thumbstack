
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpBase } from './http-base';
import { OrderModel } from '../models/order.models';

@Injectable()
export class OrderService extends HttpBase {
    constructor(httpClient: HttpClient) {
        super(httpClient);
        this.baseUrl = environment.baseUrl;
    }

    all(): Observable<OrderModel[]> {
        return this.get('api/Order');
    }

    add(data: any): Observable<OrderModel> {
        return this.post('api/Order', data);
    }

    update(id: number, data: any): Observable<OrderModel> {
        return this.put(`api/Order/${id}`, data);
    }

    checkout(data: any): Observable<OrderModel> {
        return this.post('api/Order/CheckOut', data);
    }
}
