const express = require('express');
const router = express.Router();

const Token = require('../models/token');


router.get('http://10.55.6.31:3000/auth/verify', async (req,res) =>{
    console.log('Se ingresa a la ruta de get token y se muestra la respuesta')
    console.log(res)
    console.log(req)
    /*try {        
        //const solicitudes = await Solicitudes.find();
        const solicitudes = await Solicitudes.find(req.query);
        if (!solicitudes) {
            res.json({ status:404, content:solicitudes })            
        } else {
            res.json({ status:200, content:solicitudes })            
        }
    } catch (error) {
        res.json({ status:400, content:error })
    }*/
});

router.post('/:token', async (req, res) => {
    try {
        console.log('Se mira el request')
        console.log(req)
        //const usuario = new Usuarios(req.body)
        //await usuario.save();
        //res.json({ status:'200', answer:"Usuario Creado" });
        
    } catch (error) {
        res.json({ status:400, content:error })
    }
});
module.exports = router;