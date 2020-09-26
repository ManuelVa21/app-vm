const mongoose = require('mongoose');
const { Schema } = mongoose;


var recursos_telcoSchema = new Schema({
        
    nombre: {type: String},
    direccion_ip: {type: String},
    disco_duro_blade: {type: Number},
    disco_duro_uso: {type: Number, default:0},
    ram_blade: {type: Number},
    ram_blade_uso: {type: Number, default:0},
    cpu_blade: {type: Number},
    cpu_blade_uso: {type: Number, default:0}, 
    sobreasignacion_cpu: {type: Number, default:0},   
    numero_vm: {type: Number, default:0},

});

/*Se crea el modelo (que debe interactuar con la app) para exportar y poder conectar 
con la bd, los parametros que se deben pasar son el nombre que se le quiere dar 
y el esquema el cual esta definido en una variable*/

module.exports = mongoose.model('recursos_telco', recursos_telcoSchema);
