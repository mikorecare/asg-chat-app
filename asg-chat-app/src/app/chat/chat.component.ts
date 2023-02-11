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
  });

  }

  getUser(){
    let data = {id:"63e5546c9c63e09b72f90279",p_id:"63e556969c63e09b72f9027f"}
    // this.crudservice.GetChats().subscribe(data=>{console.log(data)});
    this.crudservice.GetChatParticipants(data).subscribe();
  }

}
