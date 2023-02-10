import { Timestamp } from "rxjs";

export class Chat {
    _id!: String;
    username!: String;
    firstName!: String;
    lastName!: String;
    password!: String;
    messages! : [];
    timeStamp : Date;
}