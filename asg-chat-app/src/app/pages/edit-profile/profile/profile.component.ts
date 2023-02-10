import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
import { Global } from 'src/app/service/global';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/authservice';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userId = localStorage.getItem("userId");
  isEditing = false;
  User:any = [];
  constructor(private crudService: CrudService, public global: Global, public router: Router, public auth: AuthService) { }
  ngOnInit(): void {    
   this.getUser();
  }
 
   getUser(){
    
   this.crudService.GetUser(this.userId).subscribe((data)=>{this.User = [data["firstName"],data["lastName"],data["username"]]})
  }
  goto(value: string) {
    this.router.navigate([`/${value}`]);
  }


}
