import { Component,NgZone } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { CrudService } from 'src/app/service/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: FormGroup;
  constructor(
    private crudservice: CrudService,
    private ngzone: NgZone,
    private router: Router,
    public formBuilder: FormBuilder,
  ){
    this.form = this.formBuilder.group({

      lastName: [''],
      firstName: [''],
      username: [''],
      password: [''],
      confirmPassword:['']
    })
  }



  get username() {
    return this.form.get("username");
  }
  get password() {
    return this.form.get("password");
  }
  get firstName(){
    return this.form.get("firstName");
  }
  get lastName(){
    return this.form.get("lastName");
  }
  get confirmPassword(){
    return this.form.get("confirmPassword");
  }

  goto(){
    this.router.navigate(['/edit-profile/']);
    
  }

register(){
  if(this.firstName?.value.length < 1 || this.firstName?.value.length < 1){
    alert("First Name or Last Name is empty!");
  }
  else if(this.username?.value.length < 4){
    alert("username should be at least 4 characters!");
  }
  else if(this.confirmPassword?.value.length < 6 || this.password?.value.length < 5 ){
    alert("Password should be at least 6 characters!");
  }
  else if(this.confirmPassword?.value != this.password?.value){
    alert("Passwords didn't match");
  }
  else{
  
  this.crudservice.AddUser(this.form.value).subscribe((data)=>{
    if(data==null){
      alert("Registration Failed! Username already exists!");
      this.clearForm()
    }
    else{
      alert("Registration succesful!");
      this.goto();
    }
   
  });
  }
}

clearForm(){
  this.form.reset()
}
}
