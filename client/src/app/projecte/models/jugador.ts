

export class Jugador {

    nom! : string;
    contrincant! : Jugador | undefined;
    sala! : string | undefined;
    color! : string;
    equip! : string;
    taulell! : string;
    

    constructor(nom : string , equip : string , color : string , taulell : string, sala? : string ,  contrincant? : any){

        this.nom = nom;
        this.taulell = taulell;
        this.equip = equip;
        if(contrincant){
            this.contrincant = this.definirContrincant(contrincant);
        }
        this.sala = sala;
        this.color = color;

    }

    definirContrincant(contrincant : any){
        return new Jugador(contrincant.nom , contrincant.equip , contrincant.color , this.taulell)
    }

    getContrincantNom() : string | undefined{
        return  this.contrincant!.nom
    }

    getContrincantColor() : string | undefined{
        return this.contrincant!.color
    }

    getContrincantEquip() : string | undefined{
        return this.contrincant!.equip;
    }

}