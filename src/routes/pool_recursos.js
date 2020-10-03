const express = require('express');
const router = express.Router();

const Pool_recursos = require('../models/pool_recursos');

//Para obtener los datos acerca de los pool de recursos
router.get('/', async (req,res) =>{
    try {
        const pool_recursos = await Pool_recursos.find();
        if (!pool_recursos) {
            res.json({ status:404, content:pool_recursos })            
        } else {
            res.json({ status:200, content:pool_recursos })            
        }
    } catch (error) {
        res.json({ status:400, content:error })
    }
});

//Para obtener los datos de un solo pool
router.get('/unpool', async (req,res) =>{
    //console.log('Ruta de un proyecto')
    try {
        //correo
        //console.log(req.query)
        const pool_recursos = await Pool_recursos.findOne(req.query);
        //console.log(pool_recursos)
        if (!pool_recursos) {
            res.json({ status:404, content:pool_recursos })            
        } else {
            res.json({ status:200, content:pool_recursos })            
        }
    } catch (error) {
        res.json({ status:400, content:error })
    }
});

//Para enviar del cliente a la bd
router.post('/', async (req, res) => {
    try {        
        const pool_recursos = new Pool_recursos(req.body)        
        await pool_recursos.save();
        res.json({ status:'200', answer:"Pool de recursos creado" });        
    } catch (error) {
        res.json({ status:400, content:error })
    }
});

//Para actualizar los datos
router.put('/', async (req,res) =>{
    try {
        const pool = req.body        
        await Pool_recursos.findByIdAndUpdate(pool._id,pool,{ new: true} );        
        res.json({ status:'200', answer:"Pool actualizado" });
    } catch (error) {
        res.json({ status:400, content:error })
    }
});

router.delete('/', async (req,res) => {
    
    try {
        
        await Pool_recursos.findOneAndDelete(req.query);
        res.json({ status:'200', answer:"Pool de recursos eliminado" });   
    }
    catch (error) {
        res.json({ status:400, content:error })
    }

});

module.exports = router;


