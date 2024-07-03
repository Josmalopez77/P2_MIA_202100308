const {Router} = require('express');
const adminController = require('../controllers/adminController');
const { check } = require('express-validator');
const router = Router();
const validate = require('../middlewares/validateAtribute');



router.get('/mostrar',adminController.get_Usuarios2);
router.get('/mostrarAutos',adminController.get_Autos2);
router.get('/mostrarVuelos',adminController.get_Vuelos2);

router.post('/registro' ,[
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('apellido','El apellido es obligatorio').notEmpty(),
    check('usuario','El usuario es obligatorio').notEmpty(),
    check('correo','El correo es obligatorio').notEmpty(),
    check('password','El password es obligatorio').notEmpty(),
    check('tipo','El tipo es obligatorio').notEmpty(),
    check('path','El path es obligatorio').notEmpty(),
    check('imagen','La imagen es obligatorio').notEmpty(),
    validate
], 
adminController.registro);

router.post('/registroVuelos' ,[
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('origen','El origen es obligaorio').notEmpty(),
    check('destino','El usuario destino es obligatorio').notEmpty(),
    check('dias','Los dias son obligatorios').notEmpty(),
    check('precio','El precio es obligatorio').notEmpty(),
    validate
], 
adminController.registrar_Vuelos);

router.post('/registroAutos' ,[
    check('nombre','El nombre de la agencia es obligatorio').notEmpty(),
    check('marca','La marca es obligatoria').notEmpty(),
    check('placa','La placa es obligatoria').notEmpty(),
    check('modelo','El modelo es obligatorio').notEmpty(),
    check('precio','El precio es obligatorio').notEmpty(),
    check('ciudad','La ciudad es obligatoria').notEmpty(),
    validate
], 
adminController.registrar_Autos);

router.post('/deleteAuto',[
    check('placa','La placa es obligatoria').notEmpty(),
    validate
],
adminController.delete_Autos);

router.post('/deleteUsuarios',[
    check('usuario','El usuario es obligatorio').notEmpty(),
    validate
],
adminController.delete_Usuarios);


module.exports = router;