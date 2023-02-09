import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";

@Injectable({
    providedIn: "root",
  })
  export class ValidateService {
    email(controls: FormControl) {
        const regExp = new RegExp(/^[a-zA-Z0-9_.-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
    
        if (!regExp.test(controls.value) && controls.value.length > 0) {
          return { email: { value: true } };
        }
      }
      password(controls: FormControl): any {
        const regExp = new RegExp(/((?=.*\d)(?=.*[A-Z])(?=.*\W))/);
    
        if (!regExp.test(controls.value) && controls.value.length > 0) {
          return { password: { value: true } };
        }
      }
  }