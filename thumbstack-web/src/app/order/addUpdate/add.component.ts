import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormGroup, ValidatorFn, ValidationErrors, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromFoodStore from '../../../core/store/reducers/food-item.reducer';
import * as fromFoodActions from '../../../core/store/actions/food-item.action';
import * as fromOrderStore from '../../../core/store/reducers/order.reducer';
import * as fromOrderActions from '../../../core/store/actions/order.action';
import { FormControlService } from '../../../core/services/form-control.service';
import { Subscription, Observable } from 'rxjs';
import { FoodItemModel } from 'src/core/models/food-item.models';
import { OrderModel } from 'src/core/models/order.models';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-order-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {
  
  form: FormGroup;
  submitted: boolean;
  dataSub: Subscription;
  foodItems: FoodItemModel[];
  currentOrder: OrderModel;
  orderSub: Subscription;
  constructor(private foodItemStore: Store<fromFoodStore.FoodItemState>,
    private orderStore: Store<fromOrderStore.OrderState>, 
    private formService: FormControlService) {       
  }

  ngOnInit() {
    this.foodItemStore.dispatch(new fromFoodActions.Load());

    this.dataSub = this.foodItemStore.select(fromFoodStore.getAll).subscribe(data => {
        if (data) {
            this.foodItems = data;
            this.setAddForm();
        } 
    });

    this.orderSub = this.orderStore.select(fromOrderStore.getCurrent).subscribe(data => {
      this.currentOrder = data;
    });
    
  }

  private setAddForm() {
    this.form = this.formService.fb.group({
      customerName: [this.currentOrder ? this.currentOrder.customerName : 'new order', [Validators.required, Validators.maxLength(30)]],
      items: this.formService.fb.array([])

    });

    if (this.currentOrder) {
      this.currentOrder.items.forEach(c => this.foodItemsForm.push(this.formService.fb.group({
        foodItemId: [c.foodItemId, []],
        name: [c, []],
        cost: [c.cost, []],
        quantity: [c.quantity, [Validators.min(0)]]
      })));
    }

    this.addExtraLine();
  }

  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
    this.orderSub.unsubscribe();
  }

  get foodItemsForm(): FormArray { return this.form.get('items') as FormArray; }

  getTotal(index: number) {
    return (this.foodItemsForm.controls[index].get('cost').value * this.foodItemsForm.controls[index].get('quantity').value).toFixed(2);
  }

  getTotalQuantity() {
    return this.foodItemsForm.controls.map(c => parseInt(c.get('quantity').value)).reduce((a, b) => a + b, 0);
  }

  getTotalAmount() {
    return this.foodItemsForm.controls.map(c => parseInt(c.get('quantity').value) * parseInt(c.get('cost').value)).reduce((a, b) => a + b, 0);
  }

  getErrors(controlName: string) {
    var errors =  this.formService.getErrors(this.form, controlName, this.submitted);
    if (errors) {
        return Object.keys(errors);
      }
  
      return [];
  }

  searchAutoComplete = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => this.foodItems.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  formatter = (x: FoodItemModel) => x.name

  selectedItem(index: number, item: any) {
    var formGroup = this.foodItemsForm.controls[index];
    formGroup.get('foodItemId').patchValue(item.item.id);
    formGroup.get('cost').patchValue(item.item.cost);

    this.addExtraLine();
  }

  addExtraLine() {
    this.foodItemsForm.push(this.formService.fb.group({
      foodItemId: ['', []],
      name: ['', []],
      cost: [0, []],
      quantity: [0, [Validators.min(0)]]
    }));
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.formService.createModal("Add", "Are you sure?");
      this.formService.modalRef.result.then((result) => {
        if (result) {
          if (this.currentOrder) {
            this.orderStore.dispatch(new fromOrderActions.Update({ id: this.currentOrder.id, data: { customerName: this.form.controls.customerName.value, 
              items: this.foodItemsForm.value.filter(c => c.quantity > 0) } }));
          } else {
            this.orderStore.dispatch(new fromOrderActions.Add({ 
              customerName: this.form.controls.customerName.value, 
              items: this.foodItemsForm.value.filter(c => c.quantity > 0)
            }));
          }
        }
      }, () => {
        // do nothing
      });
    }
  }
}
