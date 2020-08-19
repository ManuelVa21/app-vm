const mongoose = require('mongoose');
const { Schema } = mongoose;

var solicitudesSchema = new Schema({
    tipo: {type: String},
    catUsuario : {type: String},
    usuario: {type: String},
    correo: {type: String},
    nombre_proyecto: {type: String},
    contrasenap: {type: String},
    descripcion: {type: String},
    tutor: {type: String},
    correo_tutor: {type: String},
    fecha: {type: Date, default: Date.now},
    fecha_fin: {type: Date},
    numvm: {type: Number},
    disco_duro: {type: Number},
    ram: {type:Number},
    cpu: {type:Number},
    //detalle_aumento
        /*aumento_fecha_fin: {type: Date},
        aumento_disco_duro: {type: Number},
        aumento_ram: {type:Number},
        aumento_cpu: {type:Number},
        aumento_vm: {type:Number},*/
    motivo: {type: String},
    maquina: {type: String},
    estado: {type: String, default:"Sin Atender"}
});

/*Se crea el modelo (que debe interactuar con la app) para exportar y poder conectar 
con la bd, los parametros que se deben pasar son el nombre que se le quiere dar 
y el esquema el cual esta definido en una variable*/

module.exports = mongoose.model('Solicitudes', solicitudesSchema);