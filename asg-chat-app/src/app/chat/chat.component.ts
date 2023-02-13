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
  isSelected = false;
  numberOfMessages: number;
  chatMe: any = [];
  chatYou: any = []
  chatId: String;
  chatData: any = []
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
    });
  }
  getName(data:Chat){

    //  const name = myData.map((data:User)=>{
    //     if(data._id != this.userId){
    //       return data.firstName
    //     }
    //   })
  }

  getChatRoom(id:any){
    this.chatId = id;
    this.crudservice.GetChatRoom(id).subscribe((data)=>{
      
      this.chatData = data[0];
      console.log(this.chatData)
      this.chatData.chats_users.map((res:any)=>{
        if(res._id==this.userId){
          this.chatMe = res;
        }
        else{
          this.chatYou = res

        }
       

      })
      this.numberOfMessages=this.chatData.messages.length
      this.isSelected = true;
    })
  }

  generateSocket() {
    const socket = io("ws://localhost:8000", { transports: ["websocket"]} );
    socket.on("message", (message) =>{
      console.log(message)
    });
    socket.emit("message", "hi server");
  }

}
