import { Injectable } from "@angular/core";
import { CrudService } from "src/app/service/crud.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
    constructor(
        public crud : CrudService
    ){}
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
            return false;
        }
    }
}