import { Component,NgZone } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { CrudService } from 'src/app/service/crud.service';
import { Router } from '@angular/router';
import { ProfileComponent } from '../profile.component';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent {
  changePassword = false;
  changeInfo = true;
  User:any = []
  userId = localStorage.getItem("userId");
  form: FormGroup;
  constructor(
    private profile: ProfileComponent,
    private crudService: CrudService,
    private ngzone: NgZone,
    private router: Router,
    public formBuilder: FormBuilder,
  ){
    this.form = this.formBuilder.group({
      lastName: [''],
      firstName: [''],
      password: [''],
      confirmPassword:['']
    })
  }

  change(){
    this.changePassword = !this.changePassword;
    this.changeInfo = !this.changeInfo;
  }
  
  getUser(){
    
    this.crudService.GetUser(this.userId).subscribe((data)=>{this.User = [data["firstName"],data["lastName"],data["username"],data["password"]]})
   }

   get lastName(){
    return this.form.get("lastName");
  } 

  get firstName(){
    return this.form.get("firstName");
  } 
  get password() {
    return this.form.get("password");
  }
  get confirmPassword(){
    return this.form.get("confirmPassword");
  }

  save(){
    alert("Update succesful!");
    this.crudService.updateUser(this.userId,this.form.value).subscribe();
    this.profile.getUser();
  }

  update(){
    if(this.changeInfo){
      if(this.firstName?.value.length < 1 || this.firstName?.value.length < 1){
        alert("First Name or Last Name is empty!");
      }
      else{
        this.password?.setValue(this.User[3]);
        this.save();
      }
    }
    if(this.changePassword){
      if(this.confirmPassword?.value != this.password?.value || this.confirmPassword?.value.length < 6 || this.password?.value.length < 6){
        alert("Passwords must match and must be 6 characters long");
      }
      else{
        this.firstName?.setValue(this.User[0]);
        this.lastName?.setValue(this.User[1]);
        this.save();
      }
    }

  }
}
