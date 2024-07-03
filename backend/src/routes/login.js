const {Router} = require('express');
const loginController = require('../controllers/loginController');
const { check } = require('express-validator');
const router = Router();
const validate = require('../middlewares/validateAtribute');

router.post('/login' ,[
    check('usuario','El usuario es obligatorio').notEmpty(),
    check('password','El password es obligatorio').notEmpty(),
    validate
], 
loginController.login2);

module.exports = router;