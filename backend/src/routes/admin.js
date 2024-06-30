const {Router} = require('express');
const adminController = require('../controllers/adminController');
const { check } = require('express-validator');
const router = Router();
const validate = require('../middlewares/validateAtribute');

router.get('/',(req,res)=>{
    res.status(200).json({
        mensaje:'Admin Preuba'
    });
    })

router.post('/registro' ,[
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('apellido','El apellido es obligatorio').notEmpty(),
    check('usuario','El usuario es obligatorio').notEmpty(),
    check('correo','El correo es obligatorio').notEmpty(),
    check('password','El password es obligatorio').notEmpty(),
    check('tipo','El tipo es obligatorio').notEmpty(),
    validate
], 
adminController.registro);

module.exports = router;