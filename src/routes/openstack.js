const express = require('express');
const router = express.Router();
const axios = require("axios");
//import Token from '!!raw-loader!../../PanelAdmin/Token.txt'
const configG = require('../config')



router.post('/crearPem', async (req,res) =>{
try {
        //console.log(req.body)
        console.log(req.body.private_key)
        //console.log(configG.ipOpenstack)
            
       /* await axios.get('http://'+configG.ipOpenstack+'/compute/v2.1/servers/detail?all_tenants=True', req.body)
        .then(res => {
           // console.log(res.data.servers);
            this.servers = res.data.servers;
            //console.log(res.data.servers[4].addresses);
        })
        .catch(error => { console.log("Error al cargar las VM's de OpenStack " + error) });  */      
        res.json({ status:'200'});
} catch (error) {
        
    res.json({ status:400, content:error })
}
});




module.exports = router;