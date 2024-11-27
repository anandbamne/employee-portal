import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TotalUseComponent } from './total-use/total-use.component';
import { ActiveSuersComponent } from './active-suers/active-suers.component';
import { RoleTableComponent } from './role-table/role-table.component';
import { PermissionTableComponent } from './permission-table/permission-table.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: "", redirectTo: "login", pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path:'total_user',component:TotalUseComponent},
  {path:'active-user',component:ActiveSuersComponent},
  {path:'role-details',component:RoleTableComponent},
  {path:'permission-details',component:PermissionTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
