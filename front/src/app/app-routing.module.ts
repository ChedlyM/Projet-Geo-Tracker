import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "Dashboard",
    component: DashboardComponent
  },
  {
    path: "Users",
    component: UsersComponent
  },
  {
    path: "Client",
    component: ClientComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
