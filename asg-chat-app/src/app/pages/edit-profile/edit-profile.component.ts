import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../service/crud.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  Users:any = [];
  constructor(private crudService: CrudService) { }
  ngOnInit(): void {
    this.crudService.GetUsers().subscribe(data=>this.Users=data);    
  }
  // delete(id:any, i:any) {
  //   console.log(id);
  //   if(window.confirm('Do you want to go ahead?')) {
  //     this.crudService.deleteBook(id).subscribe(res => {
  //       this.Users.splice(i, 1);
  //     })
  //   }
  // }
}
