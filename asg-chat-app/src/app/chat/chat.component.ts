import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import  {io} from "socket.io-client";
import { Chat } from '../service/chat';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Socket } from 'socket.io';
import { User } from '../service/user';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { Global } from '../service/global';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {
  isSearching = false;
  userSearchResults:any=[]
  socket = io("ws://localhost:8000", { transports: ["websocket"]} );
  searchForm: FormGroup;
  form: FormGroup;
  isSelected = false;
  numberOfMessages: number;
  chatMe: User
  chatYou: User 
  chatId: String;
  chatData: Chat
  tempUserId =""
  userId = localStorage.getItem("userId");
  Users: any = []
  chatsList: any = [] 
  constructor(private crudservice: CrudService, 
    public formBuilder: FormBuilder,
    public global:Global,
    public datePipe: DatePipe){
    this.socket = io("ws://localhost:8000", { transports: ["websocket"]} );
    this.form = this.formBuilder.group({
      message: ['']
  })
  this.searchForm = this.formBuilder.group({
    search: ['']
})
  }

  ngOnInit(): void {
    this.getUser();
    this.socket.on("back-to-chatroom", (received:Chat) =>{
      let {sender, timeStamp, message} = received
      console.log(sender, timeStamp, message)
      this.chatData.messages.push({sender: sender,timeStamp:timeStamp,message: message})
      let index = this.chatsList.findIndex((q:any)=>q._id == this.chatId)
      this.chatsList[index].messages.push({sender: sender,timeStamp:timeStamp,message: message})
    });
    this.socket.on("search-results",(results:any)=>{
      this.userSearchResults = results;
    })
    this.socket.on("chat-room-result",(results:any)=>{
      // console.log(results[0]._id)
      // results[0].users = Object.values(results[0].users)
      if(results[0].chats_users.findIndex((q:any)=>q._id == this.userId)!=-1){
        this.chatsList.push(results[0]);
        this.getChatRoom(results[0]._id);
        this.scrollToEnd()
      }
    })
    this.socket.on("chat-room-exists",(results:Chat)=>{
      this.getChatRoom(results._id);
      this.scrollToEnd()
    })
    this.socket.on("delete-chat-results",(results:any)=>{
      this.isSelected = false;
      this.chatsList.splice(this.chatsList.findIndex((q:any)=>q._id == this.chatId),1)
    })

  }

  ngAfterViewInit():void{
    this.searchString?.valueChanges.pipe(
      filter(Boolean),
      debounceTime(1500),
      distinctUntilChanged(),
      tap((event:KeyboardEvent) => {
        if(this.searchString?.value.trim().length==0){
          this.isSearching=false
        }
        else{
          this.generateSocketQuery(this.searchString?.value.trim())
          this.isSearching = true;
        }
        
      })
  )
  .subscribe();
  }

  //ngOnInit functions
  getUser(){
    // this.crudservice.GetChats().subscribe(data=>{console.log(data)});
    this.crudservice.GetChatParticipants(this.userId).subscribe((data)=>{
      data==null?this.chatsList:this.chatsList = data;
    });
  }

  //ABSTRACT
  get searchString() {
    return this.searchForm.get(['search']);
  }

  get formMessage() {
    return this.form.get(['message']);
  }
  //SOCKETS
  generateSocket(data?:any) {
    this.socket.emit("send-message", data); 
  }

  generateSocketQuery(data?:any){
    this.socket.emit("search-query",data);
  }

  generateSocketChatRoom(userId:any, otherUser:any){
    let finalUsers = [userId,otherUser]
    this.socket.emit("create-chat-room",finalUsers)
  }

  geneRateSocketDeleteChatRoom(){
    this.socket.emit("delete-chat-room",this.chatId)
  }
  //END_OF_SOCKETS

  getChatRoom(id:any){
    this.chatId = id; 
    this.crudservice.GetChatRoom(id).subscribe(async (data)=>{
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

  scrollToEnd(){
    const element = document.getElementById("chatBody");
    console.log(document.getElementById("chatBody")?.scrollHeight)
    element?.scrollTo({left: 0 , top: document.getElementById("chatBody")?.scrollHeight, behavior: 'smooth'});
  }

  toDate(date:Date){
      
    if(this.global.today(date)){
      return "Today at "+ this.datePipe.transform(date,'h:mm a','+0800')
    }
    else{
      return formatDate(date,this.global.day,this.global.locale,this.global.timezone)
    }
  }

  createChatRoom(id:any){
    this.isSearching = false;
    this.tempUserId = id;
    this.generateSocketChatRoom(this.userId,id)
  }

  deleteChatRoom(){
    let boolDelete = confirm("Are you sure want to delete chat room?")
    if(boolDelete == true){
      this.geneRateSocketDeleteChatRoom()
      
    }
  }
}
