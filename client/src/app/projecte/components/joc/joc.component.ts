import { Inject, Component, OnInit } from '@angular/core';
import { Taula } from '../../models/taula';

import { APP_BASE_HREF } from '@angular/common';
import { SocketService } from '../../services/socket.service';
import { Observable, Subscription } from 'rxjs';
import { Jugador } from '../../models/jugador';


@Component({
  selector: 'app-joc',
  templateUrl: './joc.component.html',
  styleUrls: ['./joc.component.css']
})
export class JocComponent implements OnInit {
  // flux de dades
  dadesJugador! : Subscription;
  // dades vista
  taula1!: Taula;
  taula2!: Taula;
  rutaImatges!: string;
  //dades partida jugador
  taulellJugador!: string;
  jugador! : Jugador;
  iniciarNoms : boolean = false;
  comensar : boolean = false;

  //dades segona partida
  dadesPartida2 : any;
  constructor(@Inject(APP_BASE_HREF) public baseHref: string , private socket : SocketService) { }

  ngOnInit(): void {
    this.taula1 = new Taula("taulell1", true);
    this.taula2 = new Taula("taulell2", false);
    this.rutaImatges = this.baseHref + "assets/imatges/"; // ruta de les imatges

    this.socket.dadesJugador.subscribe(dades =>{
      let jugador = dades.jugador;
      this.jugador = new Jugador(jugador.nom , jugador.equip,
         jugador.color , dades.sala , dades.contrincant);
      this.iniciarNoms = true;
    })

    this.socket.jugar.subscribe(msg =>{
        if(!this.comensar){
          this.comensar = true;
        }
    })
  }

  jugar(){
    this.socket.obtenirJugador();
  }

  drag(event: any, casella: any, taulellOrigen: string) {
    event.dataTransfer.setData("figuraOrigen", casella.figura);
    event.dataTransfer.setData("filaColumnaOrigen", casella.fila + casella.columna);
    event.dataTransfer.setData("taulellOrigen", taulellOrigen);
    event.dataTransfer.setData("casella", casella)
  }

  dragOver(event: any) {
    event.preventDefault();
  }

  drop(event: any, casella: any, taulellDesti: string) {

    if (taulellDesti == this.taulellJugador) {
      let figuraOrigen = event.dataTransfer.getData("figuraOrigen");

      if (this.tornCorrecte(figuraOrigen.substring(0,5), taulellDesti)) {
        let tOrigen = event.dataTransfer.getData("taulellOrigen");
        let posicioOrigen = event.dataTransfer.getData("filaColumnaOrigen");

        let origen = {
          fila: posicioOrigen.substring(0, 1),
          columna: posicioOrigen.substring(1, 2),
          figura: figuraOrigen
        }
        let desti = {
          fila: casella.fila,
          columna: casella.columna,
          figura: casella.figura
        }

        if (tOrigen == taulellDesti) {
          if (!casella.figura) {
            //casella buida
            this.moureFigura(tOrigen, figuraOrigen, origen, desti);
          } else if (casella.figura.substring(0, 5) != figuraOrigen.substring(0, 5)) {
            //casella ocupada
            this.matarFigura(tOrigen, origen, desti);
          }
        }
      }
    }

  }


  matarFigura(taulell: string, origen: any, desti: any) {

    let files = this.obtenirFiles(taulell)
    files.forEach(fila => {
      if (fila.numeroFila == parseInt(desti.fila) || fila.numeroFila == parseInt(origen.fila)) {
        let caselles = fila.getCaselles();
        caselles.forEach(casella => {
          if (casella.columna == desti.columna && casella.fila == desti.fila) {
            casella.figura = origen.figura;
          }

          if (casella.columna == origen.columna && casella.fila == origen.fila) {
            casella.figura = '';
          }
        });
      }
    });

    let taula = (taulell == "taulell1") ? this.taula1 : this.taula2;
    (desti.figura.substring(0, 5) == "white") ? taula.matarFigura('white', desti.figura) : taula.matarFigura('black', desti.figura);
  }


  moureFigura(taulell: string, figura: string, origen: any, desti: any) {

    let files = this.obtenirFiles(taulell);
    files.forEach(fila => {
      // si troba una fila relacionada amb l'origen o el desti
      if (fila.numeroFila == parseInt(origen.fila) || fila.numeroFila == parseInt(desti.fila)) {
        let caselles = fila.getCaselles();
        caselles.forEach((casella: any) => {
          if (casella.columna == origen.columna && casella.fila == origen.fila) {
            casella.figura = '';
          }
          if (casella.columna == desti.columna && casella.fila == desti.fila) {
            casella.figura = figura;
          }
        });
      }
    })
  }

  obtenirFiles(taulell: string) {
    let files = [];

    if (taulell == "taulell1") {
      this.taula1.canviarTorn();
      console.log(this.taula1.getTorn())
      return files = this.taula1.getFiles();
    } else {
      this.taula2.canviarTorn();
      return files = this.taula2.getFiles();
    }
  }

  tornCorrecte(colorMogut : string , taulell : string){
      if(taulell == 'taulell1')
        return (colorMogut == this.taula1.getTorn()) ? true : false ; 
      else
      return (colorMogut == this.taula2.getTorn()) ? true : false ; 
  }
}
