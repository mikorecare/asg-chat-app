import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { DeleteProfileComponent } from './pages/delete-profile/delete-profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { LoginComponent } from './pages/login/login.component';
import { ValidateService } from './pages/validate.service';
import { Global } from './service/global';
import { HomeComponent } from './pages/edit-profile/home/home.component';
import { ProfileComponent } from './pages/edit-profile/profile/profile.component';
import { ProfileUpdateComponent } from './pages/edit-profile/profile/profile-update/profile-update.component';
import { ChatComponent } from './chat/chat.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    EditProfileComponent,
    DeleteProfileComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    ProfileUpdateComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
