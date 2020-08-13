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
        const usuarios = await Usuarios.findById(req.query);
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
    //console.log(req.query.correo)
    //console.log(req.params.correo)
    //console.log('Se muestra el req para buscar el id')
    //console.log(req.query)
    await Usuarios.findByIdAndRemove(req.query._id);
    res.json({ status:'200', answer:"Usuario eliminado" });
});

router.post('/', async (req, res) => {
    try {
        //console.log('Se mira el request')
        //console.log(req)
        const usuario = new Usuarios(req.body)
        await usuario.save();
        res.json({ status:'200', answer:"Usuario Creado" });
        
    } catch (error) {
        res.json({ status:400, content:error })
    }
    /*
    bcrypt.hash(req.body.contrasena, 10, (err, hash) => { 
        if (hash) {
            dataUsuario.contrasena = hash
            usuarios.create(dataUsuario)
            .then(usuarios => { res.json({ status: usuarios.correo + ' Registrado' }) })
            .catch(err => { res.send('No se puede crear el usuario') })

        } else {
            console.log("Error al crear")
        }
    })*/
});

//Para actualizar los datos

router.put('/:_id', async (req, res, next) =>{
    try {
        console.log('Se ingresa a put usuario')
        console.log('Se mira el req.body', req.body)
        const usuario = new Usuarios(req.body)
        const idusuario = req.body._id
        await Usuarios.findByIdAndUpdate(usuario._id ,{$set: usuario }, { new: true} );
        res.json({ status:'200', answer:"Usuario actualizado" });
    } catch (error) {
        res.json({ status:400, content:error })
    }    
    
});

module.exports = router