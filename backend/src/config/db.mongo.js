const { MongoClient} = require('mongodb');
require('dotenv').config();

const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_HOST,
    MONGO_DATABASE,
    MONGO_PORT,
} = process.env;


const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`;
// const uri = `mongodb://root:M1A2024.@localhost:27017`;
//db.Usuarios.find().pretty();


const login = async(collec, user, pass) => {
    console.log('URI: ', uri)
    const mongoClient = new MongoClient(uri);
    try {
        const query = {usuario: user,
             password: pass};
        await mongoClient.connect().then(() => console.log('Conectado a la base de datos'));
        const dbmongo = mongoClient.db(MONGO_DATABASE);
        const coleccion = dbmongo.collection(collec);
        const result = await coleccion.findOne(query);
        return result;
}catch (error) {
    console.error('Error login: ', error);
    return error;
}
}

const get_Usuarios = async(collec) => {
    console.log('URI: ', uri)
    const mongoClient = new MongoClient(uri);
    try {
        await mongoClient.connect().then(() => console.log('Conectado a la base de datos'));
        const dbmongo = mongoClient.db(MONGO_DATABASE);
        const coleccion = dbmongo.collection(collec);
        const result = await coleccion.find().toArray();
        return result;
    } catch (error) {
        console.error('Error get_User: ', error);
        return error;
    } finally {
        await mongoClient.close();
        console.log('Desconectado de la base de datos')
    }
}

const get_Autos = async(collec) => {
    console.log('URI: ', uri)
    const mongoClient = new MongoClient(uri);
    try {
        await mongoClient.connect().then(() => console.log('Conectado a la base de datos'));
        const dbmongo = mongoClient.db(MONGO_DATABASE);
        const coleccion = dbmongo.collection(collec);
        const result = await coleccion.find().toArray();
        return result;
    } catch (error) {
        console.error('Error get_User: ', error);
        return error;
    } finally {
        await mongoClient.close();
        console.log('Desconectado de la base de datos')
    }
}

const get_Vuelos = async(collec) => {
    console.log('URI: ', uri)
    const mongoClient = new MongoClient(uri);
    try {
        await mongoClient.connect().then(() => console.log('Conectado a la base de datos'));
        const dbmongo = mongoClient.db(MONGO_DATABASE);
        const coleccion = dbmongo.collection(collec);
        const result = await coleccion.find().toArray();
        return result;
    } catch (error) {
        console.error('Error get_User: ', error);
        return error;
    } finally {
        await mongoClient.close();
        console.log('Desconectado de la base de datos')
    }
}

const insertData = async(collec, data) => {
    console.log('URI: ', uri)
    const mongoClient = new MongoClient(uri);
    try {
        await mongoClient.connect().then(() => console.log('Conectado a la base de datos'));
        const dbmongo = mongoClient.db(MONGO_DATABASE);
        const coleccion = dbmongo.collection(collec);
        const result = await coleccion.insertOne(data);
        return result;
    } catch (error) {
        console.error('Error insertData: ', error);
        return error;
    } finally {
        await mongoClient.close();
        console.log('Desconectado de la base de datos')
    }
};

const insertReserv= async(collec, data) => {
    console.log('URI: ', uri)
    const mongoClient = new MongoClient(uri);
    try {
        await mongoClient.connect().then(() => console.log('Conectado a la base de datos'));
        const dbmongo = mongoClient.db(MONGO_DATABASE);
        const coleccion = dbmongo.collection(collec);
        const result = await coleccion.insertOne(data);
        return result;
    } catch (error) {
        console.error('Error insertData: ', error);
        return error;
    } finally {
        await mongoClient.close();
        console.log('Desconectado de la base de datos')
    }
};

const deleteUser=async(collec, data)=>{
    console.log('URI: ', uri)
    const mongoClient = new MongoClient(uri);
    try {
        const query = {usuario: data};
        await mongoClient.connect().then(() => console.log('Conectado a la base de datos'));
        const dbmongo = mongoClient.db(MONGO_DATABASE);
        const coleccion = dbmongo.collection(collec);
        const result = await coleccion.deleteOne(query);
        return result;
    } catch (error) {
        console.error('Error insertData: ', error);
        return error;
    } finally {
        await mongoClient.close();
        console.log('Desconectado de la base de datos')
    }

}

const deleteAuto=async(collec, data)=>{
    console.log('URI: ', uri)
    const mongoClient = new MongoClient(uri);
    try {
        const query = {placa: data};
        await mongoClient.connect().then(() => console.log('Conectado a la base de datos'));
        const dbmongo = mongoClient.db(MONGO_DATABASE);
        const coleccion = dbmongo.collection(collec);
        const result = await coleccion.deleteOne(query);
        return result;
    } catch (error) {
        console.error('Error insertData: ', error);
        return error;
    } finally {
        await mongoClient.close();
        console.log('Desconectado de la base de datos')
    }

}

module.exports = {
    insertData,
    insertReserv,
    deleteUser,
    get_Usuarios,
    deleteAuto,
    login,
    get_Autos,
    get_Vuelos
};