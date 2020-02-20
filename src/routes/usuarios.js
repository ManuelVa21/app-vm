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
    console.log('Ruta de usuarios')
    console.log(req.query)
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
    console.log('Se muestra el req para buscar el id')
    console.log(req.query)
    await Usuarios.findByIdAndRemove(req.query._id);
    res.json({ status:'200', answer:"Usuario eliminado" });
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
/*
router.put('/:id', async (req, res, next) =>{
    await usuarios.findById(req.params.id), function(err,usuarios){
        if (!usuarios) {
            return next(new Error('No se puede cargar documento'));
        }
        else{
            usuarios.nombre= req.body.usuarios.nombre;
            usuarios.correo = req.body.usuarios.correo;
            usuarios.contrasena = req.body.usuarios.contrasena;
            usuarios.categoria_us = req.body.usuarios.categoria_us;
            usuarios.registro = req.body.usuarios.registro;
            usuarios.codigo_us = req.body.usuarios.codigo_us;
            usuarios.nombre_pro = req.body.usuarios.nombre_pro;
            usuarios.tutor_pro = req.body.usuarios.tutor_pro;
            usuarios.correo_tutor = req.body.usuarios.correo_tutor;
            usuarios.proposito = req.body.usuarios.proposito;
            usuarios.nombre_curso = req.body.usuarios.nombre_curso;
            usuarios.codigo_curso = req.body.usuarios.codigo_curso;
            usuarios.cantidad_estudiantes = req.body.usuarios.cantidad_estudiantes;
            usuarios.horario_uso = req.body.usuarios.horario_uso;

            usuarios.save()
                .then(usuarios =>{
                    res.json('Actualización completa')
                })
                .catch(err =>{
                    res.status(400).send({usuarios:'Error al actualizar'});
                });
        }
    }
});
*/
module.exports = router