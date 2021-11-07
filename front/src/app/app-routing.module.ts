import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "Routes/:id",
    component: DashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "Clients",
    component: UsersComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "Client",
    component: ClientComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "Run/:date/:id",
    component: MapComponent,
    canActivate:[AuthGuard]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
