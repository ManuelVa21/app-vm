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
    const test = new Test()
    await test.save();
    res.json(
        {
            status:'200',
            answer:"Test Created"
        }
    );
 });

module.exports = router;