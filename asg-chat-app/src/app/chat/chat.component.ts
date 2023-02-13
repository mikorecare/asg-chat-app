import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import  {io} from "socket.io-client";
import { last } from 'rxjs';
import { User } from '../service/user';
import { Chat } from '../service/chat';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  userId = localStorage.getItem("userId");
  Users: any = []
  chatsList: any =[]
  constructor(private crudservice: CrudService){

  }

  ngOnInit(): void {
    this.getUser();
    this.generateSocket()
  }

  getUser(){
    // this.crudservice.GetChats().subscribe(data=>{console.log(data)});
    this.crudservice.GetChatParticipants(this.userId).subscribe((data)=>{
      
      data==null?this.chatsList=[]:this.chatsList = data;
      console.log(this.chatsList)
    });
  }
  getName(data:Chat){
console.log(data)
    //  const name = myData.map((data:User)=>{
    //     if(data._id != this.userId){
    //       return data.firstName
    //     }
    //   })
  }

  generateSocket() {
    const socket = io("ws://localhost:8000", { transports: ["websocket"]} );
    socket.on("message", (message) =>{
      console.log(message)
    });
    socket.emit("message", "hi server");
  }

}
