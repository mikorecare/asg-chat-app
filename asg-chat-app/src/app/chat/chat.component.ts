import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import  {io} from "socket.io-client";
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
      console.log(data);
    });
  }

  generateSocket() {
    const socket = io("ws://localhost:8000", { transports: ["websocket"]} );
    socket.on("message", (message) =>{
      console.log(message)
    });
    socket.emit("message", "hi server");
  }

}
