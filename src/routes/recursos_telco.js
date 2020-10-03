const express = require('express');
const router = express.Router();

const Recursos_telco = require('../models/recursos_telco');

//Para obtener datos
router.get('/', async (req,res) =>{
    try {
        const recursos_telco = await Recursos_telco.find();
        if (!recursos_telco){
            res.json({ status:404, content:recursos_telco })
        } else {        
            res.json({ status:200, content:recursos_telco })
        }
    }
    catch (error){  
        res.json({ status:400, content:error })
    }   
    
});

router.get('/unservidor', async (req,res) =>{
    //console.log(req.query)
    try {        
        const recursos_telco = await Recursos_telco.findOne(req.query);
        //console.log(recursos_telco)
        if (!recursos_telco) {
            res.json({ status:404, content:recursos_telco })            
        } else {
            res.json({ status:200, content:recursos_telco })            
        }
    }
    catch (error) {
        res.json({ status:400, content:error })
    }
});

//Para enviar datos
router.post('/', async (req,res) =>{
    try {
        const recursos_telco = new Recursos_telco(req.body);        
        await recursos_telco.save()
        //console.log("probando insertar")
        //console.log(prueba)
        res.json({ status:'200', answer:"Servidor creado" });        
    }
    catch (error) {
        res.json({ status:400, content:error })
    }  
});
//Para actualizar los datos    VERIFICAR LA ACTUALIZACIÓN
router.put('/', async (req, res, next) =>{
    
    try {        
        recursos_telco = req.body
        //console.log(recursos_telco)        
        await Recursos_telco.findByIdAndUpdate(recursos_telco._id ,recursos_telco, { new: true} );
        res.json({ status:'200', answer:"Servidor Actualizado" });
    } catch (error) {
        res.json({ status:400, content:error })
    }  

   
});

router.delete('/', async (req,res)=>{
    try {
        await Recursos_telco.findByIdAndRemove(req.query._id)
        res.json({ status:'200', answer:"Servidor eliminado" });
    }
    catch (error) {
        res.json({ status:400, content:error })
    }      
});

module.exports = router;