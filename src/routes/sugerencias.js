const express = require('express');
const router = express.Router();

const Sugerencias = require('../models/sugerencias');

//Para obtener las listas de sugerencias
router.get('/', async (req,res) =>{
    try {        
        const sugerencias = await Sugerencias.find(req.query);
        if (!sugerencias) {
            res.json({ status:404, content:sugerencias })            
        } else {
            res.json({ status:200, content:sugerencias })            
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
        const sugerencias = new Sugerencias(req.body)
        await sugerencias.save();
        res.json({ status:'200', answer:"Sugerencia Creada" });
        
    } catch (error) {
        res.json({ status:400, content:error })
    }
});

//Para actualizar los datos
router.put('/:_id', async (req, res, next) =>{
    try {
        //console.log('Se entra a editar estado')
        //console.log(req)
        const cambiarestado = await Sugerencias.findByIdAndUpdate(req.params,req.body)
        res.json({ status:'200', answer:"Estado modificado", content: cambiarestado });

    } catch (error) {
        res.json({ status:400, content:error })
    }
});

router.delete('/', async (req,res)=>{
    //console.log('Se va a eliminar')
    //console.log(req.query)
    await Sugerencias.findByIdAndRemove(req.query._id);
    res.json({ status:'200', answer:"Eliminado correctamente" });
});


module.exports = router;