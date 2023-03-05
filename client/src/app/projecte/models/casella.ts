
export class Casella {

    fila! : string;
    columna! : string;
    figura! : string;
    color! : string;
    informativa! : boolean;
    

    constructor(fila : string , columna : string , color : string ,figura : string , informativa : boolean){
        this.fila = fila;
        this.columna = columna;
        this.color = color;
        this.figura = figura;
        this.informativa = informativa;
    }

    


}