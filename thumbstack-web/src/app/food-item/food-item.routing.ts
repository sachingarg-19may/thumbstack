import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  {
    path: 'fooditems', component: MainComponent,
    children: [
      { path: '', component: ListComponent },
      { path: 'add', component: AddComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodItemRoutingModule { }

export const FoodItemRoutingComponents = [
  ListComponent,
  AddComponent
];
