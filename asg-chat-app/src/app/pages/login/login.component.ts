import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { CrudService } from 'src/app/service/crud.service';
import { Global } from 'src/app/service/global';
import { AuthService } from 'src/services/authservice';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form : FormGroup;
  myData : [];
  constructor(
    public auth: AuthService,
    public global: Global,
    public router: Router,
    public formBuilder: FormBuilder,
    public crudService: CrudService
  ){
    this.form = this.formBuilder.group({
      username: [''],
      password: ['']
  })}

  ngOnInit(): void {
    if(this.auth.getAuthStatus()){
      this.router.navigate(['edit-profile'])
    }
  }

  goto(value: string) {
    this.router.navigate([`/${value}`]);
  }
  get password() {
    return this.form.get(['password']);
  }
  clearForm(){
    this.form.reset()
  }

  
  login(){
    this.crudService.Login(this.form.value).subscribe(data=>{
      if(data==null){
        alert("Incorrect name or password");
      }
      else{
        this.global.loginId = data.user._id;
       localStorage.setItem("userId",data.user._id);
       localStorage.setItem("username",data.user.username);
       localStorage.setItem("token", data.token);
       this.goto('edit-profile');
      }
    });
   
  }
  

}
