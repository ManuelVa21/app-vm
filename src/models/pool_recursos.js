const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pool_recursos = new Schema({
    nombre_proyecto: {type: String},
    descripcion: {type: String},
    propietario: [{nombre_u: String}],
    //numero_vm: {type: Number},
    disco_duro: {type: Number}, 
    ram: {type: Number},
    cpu: {type: Number},
    fecha_inicio: {type: Date, default: Date.now},
    fecha_fin: {type: Date},
    vms: [{
        nombre_vm: {type:String},
        so_vm: {type:String},
        versión_so_vm: {type:String},
        disco_duro_vm: {type: Number},
        ram_vm: {type:Number},
        cpu_vm: {type:Number},
        interfaces_vm: {type:Number},
        ip_vm: {type:Number},
        blade: {type:String},
        estado: {type:Boolean}
    }]
},{
    collection: 'pool_recursos'
});

/*Se crea el modelo (que debe interactuar con la app) para exportar y poder conectar 
con la bd, los parametros que se deben pasar son el nombre que se le quiere dar 
y el esquema el cual esta definido en una variable*/

module.exports = mongoose.model('pool_recursos', pool_recursos);