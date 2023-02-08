import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/login/register/register.component';
import { EditProfileComponent } from './pages/login/register/edit_profile/edit-profile/edit-profile.component';
import { DeleteProfileComponent } from './pages/delete-profile/delete-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    EditProfileComponent,
    DeleteProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
