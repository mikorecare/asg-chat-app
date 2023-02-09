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
      email: [''],
      password: [''],
      confirmPassword:['']
    })
  }



  get email() {
    return this.form.get("email");
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
    this.router.navigate(['/edit-profile/63e4cfee9b4b8c4f3ae03cb4']);
    
  }

register(){
  if(this.confirmPassword?.value != this.password?.value){
    alert("Passwords didn't match");
  }
  console.log(this.form.value);
  this.crudservice.AddUser(this.form.value).subscribe();

}
}
