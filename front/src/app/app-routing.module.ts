import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { UsersComponent } from './users/users.component';
const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "Routes/:id",
    component: DashboardComponent
  },
  {
    path: "Clients",
    component: UsersComponent
  },
  {
    path: "Client",
    component: ClientComponent
  },
  {
    path: "Run",
    component: MapComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
