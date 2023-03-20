import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  dadesJugador = this.socket.fromEvent<any>('carregar-user');
  jugar = this.socket.fromEvent<string>('jugar');
  moviment = this.socket.fromEvent<any>('moviment');
  errorJugadors = this.socket.fromEvent<string>('error-jugadors');

  constructor( private socket : Socket ) {}

  afegirEquip(equip : any){
    this.socket.emit('nou-equip' , equip);
  }

  obtenirJugador(){
    this.socket.emit("obtenir-jugador");
  }

  mourefigura(dadesMoviment : any){
    this.socket.emit("moviment" , dadesMoviment);
  }
}
