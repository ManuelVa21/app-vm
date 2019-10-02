const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recursos_telco = new Schema({
    número_vm: {type: Number},
    blade: [{
        nombre: {type: String},
        disco_duro_blade: {type: Number},
        ram_blade: {type: Number},
        cpu_blade: {type: Number}
    }],
    blade_uso: [{
        nombre: {type: String},
        disco_duro_blade_uso: {type: Number},
        ram_blade_uso: {type: Number},
        cpu_blade_uso: {type: Number}
    }]
},{
    collection: 'recursos_telco'
});

/*Se crea el modelo (que debe interactuar con la app) para exportar y poder conectar 
con la bd, los parametros que se deben pasar son el nombre que se le quiere dar 
y el esquema el cual esta definido en una variable*/

module.exports = mongoose.model('recursos_telco', recursos_telco);