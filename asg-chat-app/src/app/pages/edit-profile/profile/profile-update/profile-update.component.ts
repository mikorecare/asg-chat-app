import { Component,NgZone } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { CrudService } from 'src/app/service/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent {
  User:any = []
  userId = localStorage.getItem("userId");
  form: FormGroup;
  constructor(
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

  getUser(){
    
    this.crudService.GetUser(this.userId).subscribe((data)=>{this.User = [data["firstName"],data["lastName"],data["username"]]})
   }

  get password() {
    return this.form.get("password");
  }
  get confirmPassword(){
    return this.form.get("confirmPassword");
  }

  update(){
    if(this.confirmPassword?.value != this.password?.value){
      alert("Passwords didn't match");
    }

  }
}
