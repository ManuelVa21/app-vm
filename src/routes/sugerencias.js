const express = require('express');
const router = express.Router();

const sugerencias = require('../models/sugerencias');

//Para obtener las listas de sugerencias
router.get('/', async (req,res) =>{
    await sugerencias.find(function(err, sugerencias){
        if (err) {throw errr;}
        else{
            res.json(sugerencias);
        }
    })
});

//Para enviar del cliente a la bd
router.post('/', async (req, res) => {
    //Guardar el dato que envia el navegador
    const sugerencias = new sugerencias(req.body);
    await sugerencias.save()
    .then(sugerencias => {
        res.status(200).json({sugerencias: 'Sugerencia enviada correctamente'});
    })
    .catch(err =>{
        res.status(400).send({sugerencias: 'Error al enviar sugerencia'});
    });
});

router.delete('/:id', async (req,res)=>{
    await sugerencias.findByIdAndRemove(req.params.id, function(err,sugerencias){
        if (err) { res.json(err);}
        else{
            res.json('Se elimino satisfactoriamente');
        }
    })
});


module.exports = router;