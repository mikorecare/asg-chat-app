import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import  {io} from "socket.io-client";
import { Chat } from '../service/chat';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Socket } from 'socket.io';
import { User } from '../service/user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  socket = io("ws://localhost:8000", { transports: ["websocket"]} );
  
  form: FormGroup;
  isSelected = false;
  numberOfMessages: number;
  chatMe: User
  chatYou: User 
  chatId: String;
  chatData: Chat
  userId = localStorage.getItem("userId");
  Users: any = []
  chatsList: any = [] 
  constructor(private crudservice: CrudService, public formBuilder: FormBuilder,){
    this.socket = io("ws://localhost:8000", { transports: ["websocket"]} );
    this.form = this.formBuilder.group({
      id: [''],
      password: [''],
      message: ['']
  })
  }

  ngOnInit(): void {
    this.getUser();
    this.socket.on("back-to-chatroom", (received:Chat) =>{
      let {sender, timeStamp, message} = received
      console.log(sender, timeStamp, message)
      this.chatData.messages.push({sender: sender,timeStamp:timeStamp,message: message})
    });

  }

  getUser(){
    // this.crudservice.GetChats().subscribe(data=>{console.log(data)});
    this.crudservice.GetChatParticipants(this.userId).subscribe((data)=>{
      data==null?this.chatsList:this.chatsList = data;
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
      this.chatData.chats_users.map((res:any)=>{

        if(res._id==this.userId){
          this.chatMe = res;
          console.log(this.chatMe)
        }

        else{
          this.chatYou = res
  
        }
       

      })
      if(this.chatData.chats_users.length < 2){
        this.chatYou = {firstName: "Deleted User"}
        this.chatData.chats_users.push(this.chatYou)
      }
      this.numberOfMessages=this.chatData.messages.length
      this.isSelected = true;
    })
  }

   generateSocket(data?:any) {
      this.socket.emit("send-message", data);
      
    }


  get formMessage() {
    return this.form.get(['message']);
  }
  clearSend(){
    this.form.get(['message'])?.setValue('')
  }
  send(){
    const onlyWhiteSpace = (test:string) => test.trim().length === 0 
    if(onlyWhiteSpace(this.formMessage?.value)){
      alert("Cannot send empty messages!")
    }
    else{
          let finalMessage = {_id:this.chatId ,messages:{sender: this.userId,timeStamp: new Date,message: this.formMessage?.value}}
    this.generateSocket(finalMessage);
    this.clearSend()
    }

  }

}
