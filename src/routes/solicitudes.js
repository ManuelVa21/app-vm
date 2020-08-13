const express = require('express');
const router = express.Router();

const Solicitudes = require('../models/solicitudes');

//Para obtener la lista de solicitudes
router.get('/', async (req,res) =>{
    try {        
        //const solicitudes = await Solicitudes.find();
        const solicitudes = await Solicitudes.find(req.query);
        if (!solicitudes) {
            res.json({ status:404, content:solicitudes })            
        } else {
            res.json({ status:200, content:solicitudes })            
        }
    } catch (error) {
        res.json({ status:400, content:error })
    }
});

// obtener una solicitud
router.get('/unasolicitud', async (req,res) =>{
    try {        
        //const solicitudes = await Solicitudes.find();
        const solicitudes = await Solicitudes.findById(req.query);
        if (!solicitudes) {
            res.json({ status:404, content:solicitudes })            
        } else {
            res.json({ status:200, content:solicitudes })            
        }
    } catch (error) {
        res.json({ status:400, content:error })
    }
});

//Para enviar del cliente a la bd
router.post('/', async (req, res) => {
    try {
        //console.log('Se mira el request')
        //console.log(req.body)
        const solicitudes = new Solicitudes(req.body)
        await solicitudes.save();
        res.json({ status:'200', answer:"Solicitud Creada" });
        
    } catch (error) {
        res.json({ status:400, content:error })
    }
});

//Para actualizar los datos
router.put('/:_id', async (req, res, next) =>{
    try {
        //console.log('Se entra a editar estado')
        //console.log(req)
        const cambiarestado = await Solicitudes.findByIdAndUpdate(req.params,req.body)
        res.json({ status:'200', answer:"Estado modificado", content: cambiarestado });

    } catch (error) {
        res.json({ status:400, content:error })
    }
});

//Para eliminar datos
router.delete('/', async (req,res)=>{
    //console.log('Se va a eliminar')
    //console.log(req.query)
    await Solicitudes.findByIdAndRemove(req.query._id);
    res.json({ status:'200', answer:"Solicitud eliminada" });
});

module.exports = router;