const express = require('express');
const router = express.Router();

const Test = require('../models/test');

router.get('/',async(req,res) =>{
   console.log('test en el get')
   const test = await Test.find();
    res.json(test);
});

router.post('/',async (req,res) =>{
    console.log(req.body)
    const test = new Test(req.body)
    await test.save();
    res.json(
        {
            status:'200',
            answer:"Test Created"
        }
    );
 });
 router.delete('/', async (req,res) => {
    console.log('Se va a eliminar')
    console.log(req.query._id)
    await Test.findByIdAndRemove(req.query._id);
    res.json({
        status: 'Tarea eliminada'
    });
 })

module.exports = router;