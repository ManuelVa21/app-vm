const mongoose = require('mongoose');
const { Schema } = mongoose;

var solicitudesSchema = new Schema({
    tipo: {type: String},
    nombre_proyecto: {type: String},
    contrasenap: {type: String},
    descripcion: {type: String},
    tutor: {type: String},
    correo_tutor: {type: String},
    fecha: {type: Date, default: Date.now},
    numero_maquinas: {type: Number},
    fecha_fin: {type: Date},
    detalle_aumento: [{
        fecha_fin: {type: Date},
        disco_duro: {type: Number},
        ram: {type:Number},
        cpu: {type:Number},
        interfaces: {type:Number}
    }],
    motivo: {type: String},
    estado: {type: Boolean, default:false}
});

/*Se crea el modelo (que debe interactuar con la app) para exportar y poder conectar 
con la bd, los parametros que se deben pasar son el nombre que se le quiere dar 
y el esquema el cual esta definido en una variable*/

module.exports = mongoose.model('Solicitudes', solicitudesSchema);