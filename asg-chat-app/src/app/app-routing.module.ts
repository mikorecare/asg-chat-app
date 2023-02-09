import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { DeleteProfileComponent } from './pages/delete-profile/delete-profile.component';
import { LoginComponent } from './pages/login/login.component';
import { ValidateService } from './pages/validate.service';
import { AuthGuard } from 'src/services/auth.guard';
const routes: Routes = [
 
  { 
    path: 'login', 
    component: LoginComponent,
    children: [
     
    ] 
},
{
  path: 'register', 
  component: RegisterComponent
},
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: 'delete-profile/:id', component: DeleteProfileComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
