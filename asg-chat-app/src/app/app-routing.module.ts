import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { DeleteProfileComponent } from './pages/delete-profile/delete-profile.component';
import { LoginComponent } from './pages/login/login.component';
import { ValidateService } from './pages/validate.service';
import { AuthGuard } from 'src/services/auth.guard';
import { HomeComponent } from './pages/edit-profile/home/home.component';
import { ProfileComponent } from './pages/edit-profile/profile/profile.component';
import { ChatComponent } from './chat/chat.component';
const routes: Routes = [
 
  { 
    path: 'login', 
    component: LoginComponent,

},
{
  path: 'register', 
  component: RegisterComponent
},
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: 'delete-profile/:id', component: DeleteProfileComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'login', },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
