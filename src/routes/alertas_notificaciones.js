const express = require('express');
const router = express.Router();

const Alertas_notificaciones = require('../models/alertas_notificaciones');

//Para obtener la listas de alertas y notificaciones
router.get('/', async (req,res) =>{
    try {        
        //const solicitudes = await Solicitudes.find();
        const alertas_notificaciones = await Alertas_notificaciones.find(req.query);
        if (!alertas_notificaciones) {
            res.json({ status:404, content:alertas_notificaciones })            
        } else {
            res.json({ status:200, content:alertas_notificaciones })            
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
        const alertas_notificaciones = new Alertas_notificaciones(req.body)
        await alertas_notificaciones.save();
        res.json({ status:'200', answer:"Notificación Creada" });
        
    } catch (error) {
        res.json({ status:400, content:error })
    }
});

//Para actualizar los datos
router.put('/:_id', async (req, res, next) =>{
    try {
        //console.log('Se entra a editar estado')
        //console.log(req)
        const cambiarestado = await Alertas_notificaciones.findByIdAndUpdate(req.params,req.body)
        res.json({ status:'200', answer:"Estado modificado", content: cambiarestado });

    } catch (error) {
        res.json({ status:400, content:error })
    }
});

router.delete('/', async (req,res)=>{
    //console.log('Se va a eliminar')
    //console.log(req.query)
    await Alertas_notificaciones.findByIdAndRemove(req.query._id);
    res.json({ status:'200', answer:"Eliminado correctamente" });
});

module.exports = router;