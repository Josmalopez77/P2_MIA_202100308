const {Router} = require('express');
const userController = require('../controllers/userController');
const { check } = require('express-validator');
const router = Router();
const validate = require('../middlewares/validateAtribute');

router.get('/',(req,res)=>{
    res.status(200).json({
        mensaje:'Usuario'
    });
    })

router.post('/registro' ,[
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('apellido','El apellido es obligatorio').notEmpty(),
    check('usuario','El usuario es obligatorio').notEmpty(),
    check('correo','El correo es obligatorio').notEmpty(),
    check('password','El password es obligatorio').notEmpty(),
    check('path','El path es obligatorio').notEmpty(),
    check('imagen','La imagen es obligatorio').notEmpty(),
    validate
], 
userController.registro);

module.exports = router;