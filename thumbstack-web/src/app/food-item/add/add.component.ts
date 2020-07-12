import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromFoodStore from '../../../core/store/reducers/food-item.reducer';
import * as fromFoodActions from '../../../core/store/actions/food-item.action';
import { FormControlService } from '../../../core/services/form-control.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-food-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {
  
  form: FormGroup;
  submitted: boolean;
  constructor(private foodItemStore: Store<fromFoodStore.FoodItemState>, private formService: FormControlService) {       
    }

  ngOnInit() {
    this.setAddForm();
  }

  private setAddForm() {
    this.form = this.formService.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      cost: [1, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnDestroy(): void {
   
  }

  getErrors(controlName: string) {
    var errors =  this.formService.getErrors(this.form, controlName, this.submitted);
    if (errors) {
        return Object.keys(errors);
      }
  
      return [];
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.formService.createModal("Addd", "Save");
      this.formService.modalRef.result.then((result) => {
        if (result) {
            this.foodItemStore.dispatch(new fromFoodActions.Add({ ...this.form.value }));
        }
      }, () => {
        // do nothing
      });
    }
  }
}
