const express = require('express')
const router = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
//const bcrypt = require("bcrypt")

const usuarios = require('../models/usuarios');
router.use(cors())

process.env.SECRET_KEY = 'secret'

//Para obtener las listas de usarios registrados en la plataforma
router.get('/usuarios', async (req,res) =>{
    await usuarios.find(function(err, usuarios){
        if (err) {throw err;}
        else{
            res.json(usuarios);
        }
    })
});

router.get('/unusuario', async (req,res) =>{
    console.log('Ruta de usuarios')
    console.log(req.query.correo)
    await usuarios.findOne({ correo: req.query.correo }, function (err, usuarios) {
        if (err) {throw err;}
        else{
            res.json(usuarios);
        }
    });
});

router.delete('/delete', async (req,res)=>{
    //console.log(req.query.correo)
    //console.log(req.params.correo)
    console.log('Se muestra el req para buscar el id')
    console.log(req.query)
    await usuarios.findByIdAndRemove(req.query._id, function(err,usuarios){
        if (err) { res.json(err);}
        else{
            res.json('Se elimino el usuario satisfactoriamente');
        }
    })
});

router.post('/registro', async (req, res) => {
    console.log('Se entra a registro y se muestra req')
    console.log(req)
    const fecha = new Date()
    const dataUsuario = new usuarios ({
        nombre : req.body.nombre,
        categoria_us : req.body.categoria_us,
        correo : req.body.correo,
        contrasena : req.body.contrasena,
        registro : fecha
    })
    console.log('mostrar datausuario')
    console.log(dataUsuario)
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
/*
//Para realizar el login
router.post('/login', async (req,res) => {
    const user = await usuarios.findOne({ correo: req.body.correo })
    .then(usuarios => {
        if (user) {
            //Se compara la contraseña introducida con la almacenada, si el resultado es true se accede
            if (bcrypt.compareSync(req.body.contrasena, usuarios.contrasena)) {
                const payload = {
                    _id: usuarios._id,
                    correo: usuarios.correo
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token)
            } else {
                res.json({ error: 'El usuario no existe' })
            }                
        } else {
            res.json({ error: 'El usuario no existe' })
            console.log({error: 'El usuario no existe'})
        }
    })
    .catch(err => { res.send('error: ' + err); })
})
*/

//Para actualizar los datos
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

module.exports = router