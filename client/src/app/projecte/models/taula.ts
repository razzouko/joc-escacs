import { Fila } from "./fila";

export class Taula {

    filesTaula!: Array<Fila>;
    figuresBlanquesMortes: Array<string> = [];
    figuresNegresMortes: Array<string> = [];

    constructor(taulellPrincipal?: boolean) {
        this.filesTaula = [];
        this.generarFilesTaula();
        if (taulellPrincipal) {
            this.taulellPrincipal();
        } else {
            this.taulellSecundari();
        }
        this.iniciarTaulell();
    }

    generarFilesTaula() {
        for (let i = 0; i < 10; i++) {
            if (i == 0 || i == 9) {
                this.filesTaula.push(new Fila(i, true))
            } else {
                this.filesTaula.push(new Fila(i, false))
            }
        }
    }

    getFiles() {
        return this.filesTaula;
    }

    getFiguresMortes(color: string) {
        if (color == 'white') {
            return this.figuresBlanquesMortes;
        }
        if (color =='black') {
            return this.figuresNegresMortes;
        }
        return;
    }

    matarFigura(color: string, figura: string) {
        if (color == 'white') {
            this.figuresBlanquesMortes.push(figura);
        }else if(color == 'black'){
            this.figuresNegresMortes.push(figura);
        }
    }

    taulellPrincipal() {
        this.filesTaula.forEach(fila => {
            fila.girar();
        })
    }

    taulellSecundari() {
        this.filesTaula.reverse();
    }

    iniciarTaulell() {
        this.filesTaula.forEach(fila => {
            fila.colorcarFigures();
        })
    }

}