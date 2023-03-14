import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  dadesJugador = this.socket.fromEvent<any>('carregar-user');
  jugar = this.socket.fromEvent<string>('jugar');
  
  constructor( private socket : Socket ) {}

  afegirEquip(equip : any){
    this.socket.emit('nou-equip' , equip);
  }

  obtenirJugador(){
    this.socket.emit("obtenir-jugador")
  }
}
