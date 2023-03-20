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
jugadorsOnline = 0;

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

        if(!jugador){
            socket.emit('error-jugadors' , 'Alerta : No hi ha equips o jugadors suficients!!!!!')
        }else{

        socket.join(jugador.sala);
        jugadorsOnline++;

        socket.emit('carregar-user' , jugador);

        if(jugadorsOnline % 4 == 0){
           io.emit('jugar' , 'jugar ');
        }
    }
        
    })

    socket.on('moviment' , dadesMoviment =>{
        io.to(dadesMoviment.sala).emit('moviment' , dadesMoviment);
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
                        jugador : partida.jugador1,
                        contrincant : partida.jugador2,
                        altrePartida : partida.altrePartida
                    };
                    jugadorDisponible = true; // acaba el bucle
                }else if (partida.jugador2.lliure){
                    partida.jugador2.lliure = false;
                    jugador = {
                        sala : partida.sala,
                        taulell : partida.taulell,
                        jugador : partida.jugador2,
                        contrincant : partida.jugador1,
                        altrePartida : partida.altrePartida
                    };
                    jugadorDisponible = true; //acaba el bucle
                }
                if(!partida.jugador1.lliure && !partida.jugador2.lliure){
                    partida.assignada = true;
                }
            }
            i++;
        }
        if(!jugadorDisponible){
            return false;
        }
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

    const crearPartida = equipActual =>{

        let salaId = getSalaId();

        let novaPartida1 = {
                sala : salaId , 
                taulell : "taulell1",
                jugador1 : {
                        equip : equipAnterior.nomEquip,
                        nom : equipAnterior.jugador1.nom,
                        color : equipAnterior.jugador1.color,
                        lliure : true
                },
                jugador2 : {
                    equip : equipActual.nomEquip,
                    nom : equipActual.jugador2.nom,
                    color : equipActual.jugador2.color,
                    lliure : true
                },
                assignada : false,
                altrePartida : {
                    taulell : "taulell2",
                    jugador1 : {nom : equipAnterior.jugador2.nom , color : equipAnterior.jugador2.color , nomEquip : equipAnterior.nomEquip },
                    jugador2 : {nom : equipActual.jugador1.nom , color : equipActual.jugador1.color , nomEquip : equipActual.nomEquip }
                }
            }
            
        let novaPartida2 = {
            sala : salaId ,
            taulell : "taulell2",
            jugador1 : {
                    equip : equipAnterior.nomEquip,
                    nom : equipAnterior.jugador2.nom,
                    color : equipAnterior.jugador2.color,
                    lliure : true
            },
            jugador2 : {
                equip : equipActual.nomEquip,
                nom : equipActual.jugador1.nom,
                color : equipActual.jugador1.color,
                lliure : true
            },
            assignada : false,
            altrePartida : {
                taulell : "taulell1",
                jugador1 : {nom : equipAnterior.jugador1.nom , color : equipAnterior.jugador1.color , nomEquip : equipAnterior.nomEquip  },
                jugador2 : {nom : equipActual.jugador2.nom , color : equipActual.jugador2.color , nomEquip : equipActual.nomEquip }
            }
        }
        
        partides.push(novaPartida1 , novaPartida2)
        equipAnterior = {};
        equipLliure = false;

    }
})

function getSalaId(){
    return "sala" + Math.round(Math.random() * 1000);
}






