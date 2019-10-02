const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const solicitudes = new Schema({
    tipo: {type: String},
    fecha: {type: Date, default: Date.now},
    detalle_recursos: [{
        so: {type: String},
        version_so:{type: String},
        disco_duro: {type: Number},
        ram: {type:Number},
        cpu: {type:Number},
        interfaces: {type:Number}
    }],
    detalle_aumento: [{
        fecha_fin: {type: Date},
        disco_duro: {type: Number},
        ram: {type:Number},
        cpu: {type:Number},
        interfaces: {type:Number}
    }],
    motivo: {type: String},
    estado: {type: Boolean}
},{
    collection: 'solicitudes'
});

/*Se crea el modelo (que debe interactuar con la app) para exportar y poder conectar 
con la bd, los parametros que se deben pasar son el nombre que se le quiere dar 
y el esquema el cual esta definido en una variable*/

module.exports = mongoose.model('solicitudes', solicitudes);