import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './addUpdate/add.component';
import { DetailComponent } from './details/details.component';

const routes: Routes = [
  {
    path: 'orders', component: MainComponent,
    children: [
      { path: '', component: ListComponent },
      { path: 'create', component: AddComponent },
      { path: 'details', component: DetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule { }

export const OrderRoutingComponents = [
  ListComponent,
  AddComponent,
  DetailComponent
];
