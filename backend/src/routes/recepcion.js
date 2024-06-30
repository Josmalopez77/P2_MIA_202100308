const {Router} = require('express');

const router = Router();

router.get('/',(req,res)=>{
    res.status(200).json({
        mensaje:'Recepcion'
    });
    })

    module.exports = router;