import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-login-equips',
  templateUrl: './login-equips.component.html',
  styleUrls: ['./login-equips.component.css']
})
export class LoginEquipsComponent {

  formulari!: FormGroup;
  numeroEquip = 1;

  constructor(private fb: FormBuilder) {

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
        jugador1: this.formulari.value.jugador1,
        jugador2: this.formulari.value.jugador2,
        estat : 'esperant'
      }
      localStorage.setItem('equip' + this.numeroEquip, JSON.stringify(equip));
      this.numeroEquip++;
      this.formulari.reset();
    }
  }
  ngOnInit(): void {
  }
}
