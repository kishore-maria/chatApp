import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public socket: SocketIOClient.Socket

  constructor() {
    
  }
  
  connect() {
    this.socket = io("http://localhost:4005/clientUI");
    this.socket.connect()
    this.socket.on('connect', () => console.log('socket connected'));
  }
  
}
