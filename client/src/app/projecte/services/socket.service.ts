import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor( private socket : Socket ) {
      this.escoltarMissatges();
   }

  escoltarMissatges(){
    this.escoltarDadesUser();
  }

  escoltarDadesUser(){
    this.socket.on('carregar-user' , ()=>{
      
    })
  }

  afegirEquip(equip : any){
    this.socket.emit('nou-equip' , equip);
  }

  obtenirJugador(){
    this.socket.emit("obtenir-jugador")
  }
}
