import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { TotalUseComponent } from './total-use/total-use.component';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActiveSuersComponent } from './active-suers/active-suers.component';
import { RolesDetailsComponent } from './roles-details/roles-details.component';
import { RoleTableComponent } from './role-table/role-table.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { PermissionTableComponent } from './permission-table/permission-table.component';
import { PermissionModalComponent } from './permission-modal/permission-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    TotalUseComponent,
    AddNewUserComponent,
    ActiveSuersComponent,
    RolesDetailsComponent,
    RoleTableComponent,
    PermissionTableComponent,
    PermissionModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    MatMenuModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
