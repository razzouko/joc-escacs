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

  obj! : any;

  // dades vista
  taula1!: Taula;
  taula2!: Taula;
  rutaImatges!: string;

  //dades partida jugador
  jugador!: Jugador;

  // noms jugadors
  t1white!: string;
  t1black!: string;
  t2white!: string;
  t2black!: string;

  // controlar events a l'html
  navegadorReady: boolean = false;
  comensar: boolean = false;

  //dades segona partida
  dadesTaulell2: any;
  constructor(@Inject(APP_BASE_HREF) public baseHref: string, private socket: SocketService) { }

  ngOnInit(): void {
    this.taula1 = new Taula("taulell1", true);
    this.taula2 = new Taula("taulell2", false);
    this.rutaImatges = this.baseHref + "assets/imatges/"; // ruta de les imatges

    this.carregarSubscribes()
  }

  carregarSubscribes() {
    // subscribe a les dades del jugador
    this.socket.dadesJugador.subscribe(dades => {
      let jugador = dades.jugador;
      this.jugador = new Jugador(jugador.nom, jugador.equip,
        jugador.color, dades.taulell, dades.sala, dades.contrincant);

      this.dadesTaulell2 = dades.altrePartida;
      this.navegadorReady = true;
    })
    // subscribe al comensament del joc
    this.socket.jugar.subscribe(msg => {
      if (!this.comensar) {
        this.comensar = true;
        this.iniciarNoms();
      }
    })
    // subscribe al moviment
    this.socket.moviment.subscribe(moviment => {

      if (moviment.accio == "moure" && moviment.jugador != this.jugador.nom) {
        this.moureFigura(moviment.taulell, moviment.origen, moviment.desti, true)
      }

      if (moviment.accio == "matar" && moviment.jugador != this.jugador.nom) {
        this.matarFigura(moviment.taulell, moviment.origen, moviment.desti, true)
      }

    })

    // subscribe a l'error de jugadors
    this.socket.errorJugadors.subscribe(msg => {
      alert(msg);
    })
  }

  jugar() {
    this.socket.obtenirJugador();
  }

  iniciarNoms() {

    let jugadorPrincipal = this.jugador.nom + " - " + this.jugador.equip;
    let contrincant = this.jugador.getContrincantNom() + " - " + this.jugador.getContrincantEquip();
    let partida2Jugador1 = this.dadesTaulell2.jugador1.nom + ' - ' + this.dadesTaulell2.jugador1.nomEquip;
    let partida2Jugador2 = this.dadesTaulell2.jugador2.nom + ' - ' + this.dadesTaulell2.jugador2.nomEquip;


    if (this.jugador.taulell == "taulell1") {
      this.t1white = (this.jugador.color == 'white') ? jugadorPrincipal : contrincant;
      this.t1black = (this.jugador.color == 'black') ? jugadorPrincipal : contrincant;
      this.t2white = (this.dadesTaulell2.jugador1.color == 'white') ? partida2Jugador1 : partida2Jugador2;
      this.t2black = (this.dadesTaulell2.jugador1.color == 'black') ? partida2Jugador1 : partida2Jugador2;
    } else {
      this.t2white = (this.jugador.color == 'white') ? jugadorPrincipal : contrincant;
      this.t2black = (this.jugador.color == 'black') ? jugadorPrincipal : contrincant;
      this.t1white = (this.dadesTaulell2.jugador1.color == 'white') ? partida2Jugador1 : partida2Jugador2;
      this.t1black = (this.dadesTaulell2.jugador1.color == 'black') ? partida2Jugador1 : partida2Jugador2;
    }

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

  drop(event: any, desti: any, taulellDesti: string) {


    if (taulellDesti == this.jugador.taulell) {


      let figuraOrigen = event.dataTransfer.getData("figuraOrigen");
      let colorMogut = figuraOrigen.substring(0, 5);
      if (this.tornCorrecte(colorMogut, taulellDesti)) {

        let tOrigen = event.dataTransfer.getData("taulellOrigen");
        let posicioOrigen = event.dataTransfer.getData("filaColumnaOrigen");

        let origen = {
          fila: posicioOrigen.substring(0, 1),
          columna: posicioOrigen.substring(1, 2),
          figura: figuraOrigen
        }

        if (tOrigen == taulellDesti) {
          if (!desti.figura) {
            //casella buida
            this.moureFigura(tOrigen, origen, desti);
          } else if (desti.figura.substring(0, 5) != figuraOrigen.substring(0, 5)) {
            //casella ocupada
            this.matarFigura(tOrigen, origen, desti);
          }
        }
      }
    }
  }


  matarFigura(taulell: string, origen: any, desti: any, replicacio: boolean = false) {

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

    if (!replicacio) {

      let dadesMoviment = {
        jugador: this.jugador.nom,
        taulell: taulell,
        sala: this.jugador.sala,
        origen: origen,
        desti: desti,
        accio: "matar"
      }

      this.socket.mourefigura(dadesMoviment)
    }
  }


  moureFigura(taulell: string, origen: any, desti: any, replicacio: boolean = false) {

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
            casella.figura = origen.figura;
          }
        });
      }
    })

    if (!replicacio) {
      let dadesMoviment = {
        jugador: this.jugador.nom,
        taulell: taulell,
        sala: this.jugador.sala,
        origen: origen,
        desti: desti,
        accio: "moure"
      }

      this.socket.mourefigura(dadesMoviment)
    }
  }

  obtenirFiles(taulell: string) {

    if (taulell == "taulell1") {
      this.taula1.canviarTorn();
      return this.taula1.getFiles();
    } else {
      this.taula2.canviarTorn();
      return this.taula2.getFiles();
    }
  }

  tornCorrecte(colorMogut: string, taulell: string) {
    if (taulell == 'taulell1') {
      return (colorMogut == this.taula1.getTorn() && this.jugador.color == colorMogut) ? true : false;
    } else {
      return (colorMogut == this.taula2.getTorn() && this.jugador.color == colorMogut) ? true : false;
    }
  }
}
