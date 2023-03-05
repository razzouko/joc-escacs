import { Inject ,Component, OnInit } from '@angular/core';
import { Taula } from '../../models/taula';
import { APP_BASE_HREF } from '@angular/common';

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
    
    console.log(this.taula1)
    console.log(this.taula2)
    
  }

}
