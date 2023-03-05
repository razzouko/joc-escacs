import { Casella } from "./casella";
import { FIGURES } from "../utils/figures";

export class Fila {

    caselles: Array<Casella> = [];
    numeroFila!: number;
    columnes!: Array<string>;
    informativa!: boolean;

    constructor(numeroFila: number, informativa: boolean) {
        this.numeroFila = numeroFila;
        this.informativa = informativa;
        this.columnes = ["", "A", "B", "C", "D", "E", "F", "G", "H", ""];
        if (this.informativa) {
            this.generarCasellesInformatives();
        } else {
            this.generarCasellesJoc();
        }

    }

    generarCasellesJoc() {
        let colorCasella = '';
        if (this.numeroFila % 2 == 0) {
            colorCasella = 'marroClar';
        } else {
            colorCasella = 'marroFosc';
        }

        for (let i = 0; i < this.columnes.length; i++) {

            if (i == 0 || i == this.columnes.length - 1) {
                this.caselles.push(new Casella(this.numeroFila.toString(), "", "", "", true));
            } else {

                this.caselles.push(new Casella(this.numeroFila.toString(), this.columnes[i], colorCasella, "", false));
                switch (colorCasella) {
                    case 'marroClar':
                        colorCasella = 'marroFosc';
                        break;
                    case 'marroFosc':
                        colorCasella = 'marroClar';
                        break;
                }
            }

        }

    }

    generarCasellesInformatives() {
        for (let i = 0; i < this.columnes.length; i++) {
            this.caselles.push(new Casella("", this.columnes[i], "", "", true))
        }
    }

    getCaselles() {
        return this.caselles;
    }

    girar() {
        this.caselles.reverse();
    }

    colorcarFigures() {
        this.caselles.forEach(casella => {
            FIGURES.forEach(figura => {

                if(casella.informativa){
                    return;
                }

                if (casella.fila == figura.fila && casella.columna == figura.columna) {
                    casella.figura = figura.imatge_url;
                } else if(casella.fila == figura.fila && figura.columna == 'totes'){
                    casella.figura = figura.imatge_url;
                }

 
            })

        })

        console.log(this.caselles)
    }


}