import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form : FormGroup;
  myData : [];
  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public crudService: CrudService
  ){
    this.form = this.formBuilder.group({
      email: [''],
      password: ['']
  })}

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
    console.log(this.form.value)
    this.crudService.Login(this.form.value).subscribe(data=>{
      if(data==null){
        alert("Incorrect name or password");
      }
      else{
        this.goto('register');
      }
    });
   
  }
  

}
