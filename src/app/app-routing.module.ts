import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsListComponent } from './items-list/items-list.component';
import { NewItemComponent } from './new-item/new-item.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ItemComponent } from './item/item.component';
import { ItemEditComponent } from './item-edit/item-edit.component';


const routes: Routes = [
  { path: "edit/:item_id", component: ItemEditComponent },
  { path: "list", component: ItemsListComponent },
  { path: "item", component: ItemComponent },
  { path: "item/:item_id", component: ItemComponent },
  { path: "new-item", component: NewItemComponent },
  // { path: "login", component: LoginComponent },
  // { path: "register", component: RegisterComponent },
  { path: '', pathMatch: 'full', redirectTo: '/list' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
