import { Injectable } from '@angular/core';
import { User,  } from './user';
import { Chat } from './chat';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class CrudService {
  // Node/Express API
  REST_API: string = 'http://localhost:8000/api';
  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) {}

  Login(data: User):Observable<any>{
    let API_URL = `${this.REST_API}/login`;
    return this.httpClient
      .post(API_URL, data);
  }
  RefreshToken(authToken:any):Observable<any>{
    let API_URL = `${this.REST_API}/refresh/token`;
    return this.httpClient.post(API_URL, {token:authToken})
  }
  // Add
  AddUser(data: User): Observable<any> {
    let API_URL = `${this.REST_API}/add-user`;
    return this.httpClient
      .post(API_URL, data);
  }
  // Get all objects
  GetUsers() {
    return this.httpClient.get(`${this.REST_API}`);
  }



  // Get single object
  GetUser(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/read-user/${id}`;
    return this.httpClient.post(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  // Update
  updateUser(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/update-user/${id}`;
    return this.httpClient
      .put(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }
  // Delete
  deleteUser(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-user/${id}`;
    return this.httpClient
      .delete(API_URL, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  GetChatRoom(id:any):Observable<any>{
    let API_URL = `${this.REST_API}/chat/${id}`;
    return this.httpClient.get(API_URL,{headers: this.httpHeaders}).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    )
  }

  GetChatParticipants(data:any):Observable<any>{
  
    let API_URL = `${this.REST_API}/chats-list`;
    return this.httpClient.post(API_URL,{myId: data})
    .pipe(
      map((res: any)=>{
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  GetChats(){
    return this.httpClient.get(`${this.REST_API}/chats`);
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      errorMessage;
    });
  }
}