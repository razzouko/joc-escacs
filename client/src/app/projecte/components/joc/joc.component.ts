import { Inject, Component, OnInit } from '@angular/core';
import { Taula } from '../../models/taula';

import { APP_BASE_HREF } from '@angular/common';


@Component({
  selector: 'app-joc',
  templateUrl: './joc.component.html',
  styleUrls: ['./joc.component.css']
})
export class JocComponent implements OnInit {

  taula1!: Taula;
  taula2!: Taula;
  ruta!: string;
  constructor(@Inject(APP_BASE_HREF) public baseHref: string) { }

  ngOnInit(): void {
    this.taula1 = new Taula(true);
    this.taula2 = new Taula(false);
    this.ruta = this.baseHref + "assets/imatges/";

  }

  drag(event: any, casella: any, taulellOrigen: string) {
    event.dataTransfer.setData("figuraOrigen", casella.figura);
    event.dataTransfer.setData("filaColumnaOrigen", casella.fila + casella.columna);
    event.dataTransfer.setData("taulellOrigen", taulellOrigen);

  }

  dragOver(event: any) {
    event.preventDefault();
  }

  drop(event: any, casella: any, taulellDesti: string) {

    let tOrigen = event.dataTransfer.getData("taulellOrigen");
    let figuraOrigen = event.dataTransfer.getData("figuraOrigen");
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
      } else if(casella.figura.substring(0,5) != figuraOrigen.substring(0,5)){
        //casella ocupada
        this.matarFigura(tOrigen, origen, desti);
      }
    }

  }


  matarFigura(taulell: string, origen: any, desti: any) {

    let taula = (taulell == "t1") ? this.taula1 : this.taula2;

    taula.getFiles().forEach(fila => {
      if (fila.numeroFila == parseInt(desti.fila) || fila.numeroFila == parseInt(origen.fila)) {
        let caselles = fila.getCaselles();
        caselles.forEach(casella => {
          if (casella.columna == desti.columna && casella.fila == desti.fila) {
            casella.figura = origen.figura;
          }

          if(casella.columna == origen.columna && casella.fila == origen.fila){
              casella.figura = '';
          }
        });
      }
    });

    (desti.figura.substring(0,5) == "white") ? taula.matarFigura('white' , desti.figura) : taula.matarFigura('black' , desti.figura);
  }


  moureFigura(taulell: string, figura: string, origen: any, desti: any) {
    let files = (taulell == "t1") ? this.taula1.getFiles() : this.taula2.getFiles();

    files.forEach(fila => {
      // si troba una fila relacionada amb l'origen o el desti
      if (fila.numeroFila == parseInt(origen.fila) || fila.numeroFila == parseInt(desti.fila)) {
        let caselles = fila.getCaselles();
        caselles.forEach(casella => {
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
}
