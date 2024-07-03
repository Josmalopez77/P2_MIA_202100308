const { insertData, deleteUser, get_Usuarios, deleteAuto, get_Autos, get_Vuelos } = require('../config/db.mongo');
const { uploadFile2 } = require('../config/bucket');
// const { bcrypt } = require('bcryptjs');

const get_Usuarios2 = async (req, res) => {
    const result = await get_Usuarios('Usuarios');
    console.log('Resultado: ', result);
    return res.status(200).json(
        {
            status: true,
            msg: 'Autos obtenidos exitosamente',
            data: result
        });
}

const get_Autos2 = async (req, res) => {
    const result = await get_Autos('Autos');
    console.log('Resultado: ', result);
    return res.status(200).json(
        {
            status: true,
            msg: 'Autos obtenidos exitosamente',
            data: result
        });

}

const get_Vuelos2 = async (req, res) => {
    const result = await get_Vuelos('Vuelos');
    console.log('Resultado: ', result);

    return res.status(200).json(
    {
        status: true,
        msg: 'Autos obtenidos exitosamente',
        data: result
    });
}


const registro = async (req, res) => {
    // Recibir los datos enviados desde el cliente
    const { nombre, apellido, usuario, correo, password, tipo, path, imagen } = req.body;

    // Manipulacion de datos
    // Insertar datos a la base de datos
    console.log('Datos recibidos', nombre, apellido, usuario, correo, password, tipo, path, imagen);

    // const p_2 = await bcrypt.hash(password, 10);
    await uploadFile2(path, imagen);
    const ruta_aws = `https://mia-jmll2024.s3.amazonaws.com/${path}`;
    const result = await insertData('Usuarios', {
        nombre,
        apellido,
        usuario,
        correo,
        password,
        tipo,
        imagen:ruta_aws,
        path
    });
    
    


    if(result instanceof Error) {
        return res.status(500).json(
            {
                status: false,
                msg: 'Error al registrar usuario',
                data: result
            });
    };

    // Respuesta
    return res.status(200).json(
    {
        status: true,
        msg: 'Registro exitoso',
        data: result
    });
};

const registrar_Vuelos = async (req, res) => {
    // Recibir los datos enviados desde el cliente
    const { nombre, origen, destino, dias, precio } = req.body;

    // Manipulacion de datos
    // Insertar datos a la base de datos
    console.log('Datos recibidos', nombre, origen, destino, dias, precio );

    // const p_2 = await bcrypt.hash(password, 10);

    const result = await insertData('Vuelos', {
        nombre,
        origen,
        destino,
        dias,
        precio
    });


    if(result instanceof Error) {
        return res.status(500).json(
            {
                status: false,
                msg: 'Error al registrar vuelo',
                data: result
            });
    };

    // Respuesta
    return res.status(200).json(
    {
        status: true,
        msg: 'Registro exitoso',
        data: result
    });
};

const registrar_Autos = async (req, res) => {
    // Recibir los datos enviados desde el cliente
    const { nombre, marca, placa, modelo, precio, ciudad } = req.body;

    // Manipulacion de datos
    // Insertar datos a la base de datos
    console.log('Datos recibidos', nombre, marca, placa, modelo, precio, ciudad  );

    // const p_2 = await bcrypt.hash(password, 10);

    const result = await insertData('Autos', {
        nombre, 
        marca, 
        placa, 
        modelo, 
        precio, 
        ciudad 
    });


    if(result instanceof Error) {
        return res.status(500).json(
            {
                status: false,
                msg: 'Error al registrar auto',
                data: result
            });
    };

    // Respuesta
    return res.status(200).json(
    {
        status: true,
        msg: 'Auto registrado exitosamente',
        data: result
    });
};

const delete_Usuarios = async (req, res) => {
    // Recibir los datos enviados desde el cliente
    const { usuario } = req.body;

    // Manipulacion de datos
    // Insertar datos a la base de datos
    console.log('Datos recibidos', usuario );

    // const p_2 = await bcrypt.hash(password, 10);
    const resultado = await deleteUser('Usuarios', usuario);

    if (resultado) {
        console.log('Usuarios Eliminado', resultado);
        return res.status(200).json({
            status: true,
            msg: 'Validación exitosa',
            data: resultado // Devuelve el resultado de la autenticación
        });
    } else {
        console.log('Usuario no encontrado');
        return res.status(401).json({
            status: false,
            msg: 'Credenciales inválidas',
        });
    }
};

const delete_Autos = async (req, res) => {
    // Recibir los datos enviados desde el cliente
    const { placa } = req.body;

    // Manipulacion de datos
    // Insertar datos a la base de datos
    console.log('Datos recibidos', placa );

    // const p_2 = await bcrypt.hash(password, 10);
    const resultado = await deleteAuto('Autos', placa);

    if (resultado) {
        console.log('Auto Eliminado', resultado);
        return res.status(200).json({
            status: true,
            msg: 'Validación exitosa',
            data: resultado // Devuelve el resultado de la autenticación
        });
    } else {
        console.log('Auto no encontrado');
        return res.status(401).json({
            status: false,
            msg: 'Credenciales inválidas',
        });
    }
};

module.exports = {
    registro,
    registrar_Vuelos,
    registrar_Autos,
    delete_Usuarios,
    get_Usuarios2,
    delete_Autos,
    get_Autos2,
    get_Vuelos2
};
