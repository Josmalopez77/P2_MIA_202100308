const {login } = require('../config/db.mongo');
// const { bcrypt } = require('bcryptjs');

const login2 = async (req, res) => {
    try {
        // Recibir los datos enviados desde el cliente
        const { usuario, password } = req.body;

        // Verifica que usuario y password sean proporcionados
        if (!usuario || !password) {
            return res.status(400).json({
                status: false,
                msg: 'Usuario y contraseña son requeridos',
            });
        }

        // Realiza la autenticación
        const resultado = await login('Usuarios', usuario, password);

        // Verifica el resultado de la autenticación
        if (resultado) {
            console.log('Usuario autenticado:', resultado);
            return res.status(200).json({
                status: true,
                msg: 'Validación exitosa',
                data: resultado // Devuelve el resultado de la autenticación
            });
        } else {
            console.log('Credenciales inválidas');
            return res.status(401).json({
                status: false,
                msg: 'Credenciales inválidas',
            });
        }
    } catch (error) {
        console.error('Error al autenticar usuario:', error);
        return res.status(500).json({
            status: false,
            msg: 'Error al autenticar usuario',
            error: error.message // Devuelve el mensaje de error al cliente
        });
    }
};

module.exports = {
    login2
};
