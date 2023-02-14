import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import  {io} from "socket.io-client";
import { Chat } from '../service/chat';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  form: FormGroup;
  isSelected = false;
  numberOfMessages: number;
  chatMe: any = [];
  chatYou: any = []
  chatId: String;
  chatData: any = []
  userId = localStorage.getItem("userId");
  Users: any = []
  chatsList: any =[]
  constructor(private crudservice: CrudService, public formBuilder: FormBuilder,){
    this.form = this.formBuilder.group({
      id: [''],
      password: [''],
      message: ['']
  })
  }

  ngOnInit(): void {
    this.getUser();
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

  generateSocket(type:string,data?:any) {
    const socket = io("ws://localhost:8000", { transports: ["websocket"]} );
    socket.removeAllListeners()
    if(type=="receive"){
      socket.on("back-to-user", (message) =>{
        console.log(message)
      });
      
    }
    if(type=="send"){
      console.log("blah blah")
      socket.emit("send-message", data);
    }
    }


  get message() {
    return this.form.get(['message']);
  }
  clearForm(){
    this.form.reset()
  }
  send(){
    let finalMessage = {_id:this.chatId ,messages:{sender: this.userId,timeStamp: new Date,message: this.message?.value}}
    this.generateSocket("send",finalMessage);
  }

}
