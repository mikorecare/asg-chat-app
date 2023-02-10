import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CrudService } from "src/app/service/crud.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
    constructor(
        public crud : CrudService,
        public router: Router
    ){}
    goto(value: string) {
        this.router.navigate([`/${value}`]);
      }
    getAuthStatus(){
        const token = localStorage.getItem('token');
        if(token){
            this.crud.RefreshToken(token).subscribe(
            (data)=>{
                localStorage.setItem("token",data)
            }
            )
            return true;
        }
        else{
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("userId");
            this.goto("login");
            return false;
        }
    }
}