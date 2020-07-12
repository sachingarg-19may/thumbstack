
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpBase } from './http-base';
import { FoodItemModel } from '../models/food-item.models';

@Injectable()
export class FoodItemService extends HttpBase {
    constructor(httpClient: HttpClient) {
        super(httpClient);
        this.baseUrl = environment.baseUrl;
    }

    all(): Observable<FoodItemModel[]> {
        return this.get('api/FoodItem');
    }

    add(data: any): Observable<void> {
        return this.post('api/FoodItem', data);
    }
}
