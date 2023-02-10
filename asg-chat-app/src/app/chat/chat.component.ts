import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  Users: any = []
  constructor(private crudservice: CrudService){

  }

  ngOnInit(): void {
  this.crudservice.GetUsers().subscribe(data=>{
    this.Users = data;
  })

  }

  getUser(User: any){
    this.crudservice.GetChats().subscribe(data=>{
      console.log(data);
    })
  }

}
