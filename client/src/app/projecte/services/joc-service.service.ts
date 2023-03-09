import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class JocServiceService {

  constructor( private socket : Socket) { }

  enviarMissatge(missatge : string){
    this.socket.emit('missatge', missatge);
  }

  rebreMissatge(){
    return this.socket.fromEvent('missatge').pipe(map((data) => data));
  }
}
