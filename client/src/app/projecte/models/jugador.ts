

export class Jugador {

    nom! : string;
    contrincant! : Jugador | undefined;
    sala! : string | undefined;
    color! : string;
    equip! : string;
    

    constructor(nom : string , equip : string , color : string, sala? : string ,  contrincant? : any){

        this.nom = nom;
        this.equip = equip;
        if(contrincant){
            this.contrincant = this.definirContrincant(contrincant);
        }
        this.sala = sala;
        this.color = color;

    }

    definirContrincant(contrincant : any){
        console.log(contrincant)
        return new Jugador(contrincant.nom , contrincant.equip , contrincant.color)
    }

    getContrincantNom() : string | undefined{
        return this.contrincant?.nom
    }

    getContrincantColor() : string | undefined{
        return this.contrincant?.color
    }

}