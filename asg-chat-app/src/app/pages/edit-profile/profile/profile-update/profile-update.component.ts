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
  isDeleting:any;
  changePassword = false;
  changeInfo = true;
  User:any = []
  userId = localStorage.getItem("userId");
  formDelete:FormGroup
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
    this.formDelete = this.formBuilder.group({
      passwordDelete: [''],
      confirmPasswordDelete: [''],
    })
  }

  goto(value: string) {
    this.router.navigate([`/${value}`]);
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
  get passwordDelete(){
    return this.formDelete.get("passwordDelete");
  }
  get confirmPasswordDelete(){
    return this.formDelete.get("confirmPasswordDelete");
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

  deleteAccount(){
    if(this.confirmPasswordDelete?.value != this.passwordDelete?.value){
      alert("Passwords didn't match");
    }
    else{
      this.crudService.deleteUser(this.userId,this.passwordDelete?.value).subscribe(
        (data)=>{
          if(data==null || data.msg==null){
            alert("Password is incorrect!")
          }
          else{
            console.log(data)
            alert("Account has been deleted!")
            localStorage.removeItem("userId");
            localStorage.removeItem("username");
            localStorage.removeItem("token");
            this.goto("login");
            
          }
        }
      )
    }
  }
}
