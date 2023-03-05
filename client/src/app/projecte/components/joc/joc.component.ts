import { Inject ,Component, OnInit } from '@angular/core';
import { Taula } from '../../models/taula';

import { CdkDropList, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { APP_BASE_HREF } from '@angular/common';
import { Fila } from '../../models/fila';
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
    
  
  }

  drop(event: CdkDragDrop<Fila>) {
    console.log(event)
  }

}
