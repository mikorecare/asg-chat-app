import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { CrudService } from './../../service/crud.service';
import { Global } from 'src/app/service/global';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/authservice';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  userId = localStorage.getItem("userId");
  User:any = [];
  constructor(private crudService: CrudService, public global: Global, public router: Router, public auth: AuthService) { }
  ngOnInit(): void {    
   this.getUser();
  }
 
   getUser(){
    
   this.crudService.GetUser(this.userId).subscribe((data)=>{this.User = data["firstName"]})
  }
  goto(value: string) {
    this.router.navigate([`/${value}`]);
  }
  // delete(id:any, i:any) {
  //   console.log(id);
  //   if(window.confirm('Do you want to go ahead?')) {
  //     this.crudService.deleteBook(id).subscribe(res => {
  //       this.Users.splice(i, 1);
  //     })
  //   }
  // }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    this.goto("login");
  }
}
