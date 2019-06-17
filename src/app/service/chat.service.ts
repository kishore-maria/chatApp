import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public BASE_URL: String = "/api/chat/"

  constructor(public http: HttpClient) { }

  getMessages(userId) {
    console.log(userId)
    return this.http.get<any>(`${this.BASE_URL}${userId}`)
  }

  sendMessage(data) {
    return this.http.post<any>(`${this.BASE_URL}send`, data)
  }

}
