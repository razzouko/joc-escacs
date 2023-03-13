const app = require('express')();
const server = require('http').Server(app);
const port = 4000;

const io = require('socket.io')(server , {
    cors: {
        origin : '*'
    }
} )

var equipAnterior = {};
var equipLliure = false;
var partides = [];

server.listen(port , ()=>{
    console.log(`Escoltant al port ${port}`)
})

io.on("connection" , socket=>{

    console.log("User conectat");
    
    socket.on("nou-equip", (equip)=>{
        guardarEquip(equip)
    });


    socket.on("obtenir-jugador" , ()=>{
        let jugador = obtenirJugador();
        socket.join(jugador.sala)
        
    })

    
    const obtenirJugador = ()=> {

        let jugador = {};
        let i = 0;
        let jugadorDisponible = false;
        while(i < partides.length && !jugadorDisponible){

            let partida = partides[i];

            if(!partida.assignada){
                if(partida.jugador1.lliure){
                    partida.jugador1.lliure = false;
                    jugador = {
                        sala : partida.sala,
                        taulell : partida.taulell,
                        jugador : partida.jugador1
                    };
                    jugadorDisponible = true; // acaba el bucle
                }else if (partida.jugador2.lliure){
                    partida.jugador2.lliure = false;
                    jugador = {
                        sala : partida.sala,
                        taulell : partida.taulell,
                        jugador : partida.jugador2
                    };
                    jugadorDisponible = true; //acaba el bucle
                }
                if(!partida.jugador1.lliure && !partida.jugador2.lliure){
                    partida.assignada = true;
                }
            }
            i++;
        }
        console.log(partides)
        return jugador;
    }


    const guardarEquip = equip =>{
        
        if(equipLliure){
            crearPartida(equip)
        }else{ 
            equipAnterior = equip;
            equipLliure = true;
        }
    }

    const crearPartida = equip =>{

        let novaPartida1 = {
                sala : getSalaId() , 
                taulell : "taulell1",
                jugador1 : {
                        equip : equipAnterior.nomEquip,
                        nom : equipAnterior.jugador1.nom,
                        color : equipAnterior.jugador1.color,
                        lliure : true
                },
                jugador2 : {
                    equip : equip.nomEquip,
                    nom : equip.jugador2.nom,
                    color : equip.jugador2.color,
                    lliure : true
                },
                assignada : false
            }
            
        let novaPartida2 = {
            sala : getSalaId(),
            taulell : "taulell2",
            jugador1 : {
                    equip : equipAnterior.nomEquip,
                    nom : equipAnterior.jugador2.nom,
                    color : equipAnterior.jugador2.color,
                    lliure : true
            },
            jugador2 : {
                equip : equip.nomEquip,
                nom : equip.jugador1.nom,
                color : equip.jugador1.color,
                lliure : true
            },
            assignada : false
        }
        
        partides.push(novaPartida1 , novaPartida2)
        equipAnterior = {};
        equipLliure = false;

    }
})

function getSalaId(){
    return "sala" + Math.round(Math.random() * 1000);
}






