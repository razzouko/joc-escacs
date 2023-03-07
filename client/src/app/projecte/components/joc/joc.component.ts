import { Inject ,Component, OnInit } from '@angular/core';
import { Taula } from '../../models/taula';

import { APP_BASE_HREF } from '@angular/common';
import { Casella } from '../../models/casella';


@Component({
  selector: 'app-joc',
  templateUrl: './joc.component.html',
  styleUrls: ['./joc.component.css']
})
export class JocComponent implements OnInit {

  taula1! : Taula;
  taula2! : Taula;
  ruta! : string;
  constructor(@Inject(APP_BASE_HREF) public baseHref: string) { }

  ngOnInit(): void {
    this.taula1 = new Taula(true);
    this.taula2 = new Taula(false);
    this.ruta = this.baseHref + "assets/imatges/";
  }

  drag(event: any , casella : any){
    event.dataTransfer.setData("figuraOrigen", casella.figura);
    event.dataTransfer.setData("filaColumna", casella.fila + casella.columna);
  }

  dragOver(event : any){
    event.preventDefault();
  }
  
  drop(event : any , casella : any){
    
  }

  

  moureFigura( taulell : string , figura : string , origen : any , desti : any , mateixaFila : boolean){

      if(taulell == "taulell1"){
        let files = this.taula1.getFiles();
        files.forEach(fila =>{
          // si troba una fila relacionada amb l'origen o el desti
            if(fila.numeroFila == parseInt(origen.fila) || fila.numeroFila == parseInt(desti.fila) ){
              let caselles = fila.getCaselles();
              caselles.forEach(casella => {

                  if(mateixaFila){
                    if(casella.columna == origen.columna){
                      casella.figura = '';
                    }

                    if(casella.columna == desti.columna){
                      casella.figura = figura;
                    }
                  }else{

                    if(casella.columna == origen.columna && casella.fila == origen.fila){
                      casella.figura = '';
                    }

                    if(casella.columna == desti.columna && casella.fila == desti.fila){
                      casella.figura = figura;
                    }
                  }
              });
          
            }
        })
      }

  }
}
