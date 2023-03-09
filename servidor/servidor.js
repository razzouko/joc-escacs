const app = require('express')();
const server = require('http').Server(app);
const port = 4000;

const io = require('socket.io')(server , {
    cors: {
        origin : '*'
    }
} )


server.listen(port , ()=>{
    console.log(`Escoltant al port ${port}`)
})

io.on("connection" , socket=>{
    console.log("User conectat");
    socket.emit("Holaa bones!!!");
})



