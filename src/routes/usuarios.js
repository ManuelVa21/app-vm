const express = require('express');
const router = express.Router();
const cors = require("cors")
const bcrypt = require("bcrypt")

const Usuarios = require('../models/usuarios');
router.use(cors())

process.env.SECRET_KEY = 'secret'

//Para obtener las listas de usarios registrados en la plataforma
router.get('/', async (req,res) =>{
    try {
        const usuarios = await Usuarios.find();
        if (!usuarios) {
            res.json({ status:404, content:usuarios })            
        } else {
            res.json({ status:200, content:usuarios })            
        }
    } catch (error) {
        res.json({ status:400, content:error })
    }
});

router.get('/unusuario', async (req,res) =>{
    //onsole.log('Ruta de usuarios')
    //console.log(req.query)
    try {
        const usuarios = await Usuarios.findOne(req.query);
        if (!usuarios) {
            res.json({ status:404, content:usuarios })            
        } else {
            res.json({ status:200, content:usuarios })            
        }
    } catch (error) {
        res.json({ status:400, content:error })
    }
});

router.delete('/', async (req,res)=>{
    try {
        await Usuarios.findOneAndDelete(req.query);
        res.json({ status:'200', answer:"Usuario eliminado" });
        
    } catch (error) {
        res.json({ status:400, content:error })
    }

});

router.post('/', async (req, res) => {
    try {
        //console.log('Se mira el request')
        //console.log(req.body)
        const usuario = new Usuarios(req.body)
        await usuario.save();
        res.json({ status:'200', answer:"Usuario Creado" });        
    } catch (error) {
        res.json({ status:400, content:error })
    }
   
});

//Para actualizar los datos

router.put('/:_id', async (req, res, next) =>{
    try {
        
        const usuario = req.body        
        await Usuarios.findByIdAndUpdate(usuario._id ,usuario, { new: true} );
        res.json({ status:'200', answer:"Usuario actualizado" });
    } catch (error) {
        res.json({ status:400, content:error })
    }    
    
});

module.exports = router