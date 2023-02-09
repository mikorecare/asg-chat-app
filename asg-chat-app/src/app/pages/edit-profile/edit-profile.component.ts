import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { CrudService } from './../../service/crud.service';
import { Global } from 'src/app/service/global';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, AfterViewChecked {
  User:any = this.global.loginId;
  constructor(private crudService: CrudService, public global: Global, public router: Router) { }
  ngOnInit(): void {    

  }
  ngAfterViewChecked(): void {

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
    this.goto("login");
  }
}
