const { MongoClient } = require('mongodb');



//MONGO DB SERVICIO WEB

const uri = 'mongodb+srv://soriano2020s:Pasin45s@mongotest.kxh6sur.mongodb.net/?retryWrites=true&w=majority';


//Mongo DB DE USO LOCAL

//const uri = 'mongodb://localhost:27017/mutacion_primeras';

async function conectar() {
    const cliente = new MongoClient(uri);
    await cliente.connect();
    console.log('¡Conectado a la base de datos MongoDB!');
    return cliente;
}

module.exports = conectar;
