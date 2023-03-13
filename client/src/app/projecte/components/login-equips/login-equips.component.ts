import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SocketService } from '../../services/socket.service';
@Component({
  selector: 'app-login-equips',
  templateUrl: './login-equips.component.html',
  styleUrls: ['./login-equips.component.css']
})
export class LoginEquipsComponent {

  formulari!: FormGroup;
  numeroEquip = 1;

  constructor(private fb: FormBuilder , private socket : SocketService) {

    this.formulari = this.fb.group({
      nomEquip: ['', Validators.required],
      jugador1: ['', Validators.required],
      jugador2: ['', Validators.required]
    });

  }

  guardarDadesEquip() {
    if (this.formulari.status == 'INVALID') {
      alert('Falten dades per introduir');
    }

    if (this.formulari.status == 'VALID') {
      let equip = {
        nomEquip: this.formulari.value.nomEquip,
        jugador1: {nom : this.formulari.value.jugador1.trim(),
                   color : 'white'},
        jugador2:  { nom : this.formulari.value.jugador2.trim(),
                    color : 'black'},
      }
      this.socket.afegirEquip(equip)
      this.formulari.reset();
    }
  }

  ngOnInit(): void {}
}
