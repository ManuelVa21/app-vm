const mongoose = require('mongoose');
const { Schema } = mongoose;

const pool_recursosSchema = new Schema({
    nombre_proyecto: {type: String},
    servidor_ubicacion: {type: String},
    estado: {type:String, default:'Activo'},
    id_openstack: {type: String},
    contrasena: {type: String},
    descripcion: {type: String},
    propietario: {type: String},
    emailPropietario: {type: String},
    numero_vm: {type: Number},
    disco_duro: {type: Number}, 
    ram: {type: Number},
    cpu: {type: Number},
    fecha_inicio: {type: Date, default: Date.now},
    fecha_fin: {type: Date},
    vms: [{
        nombre_vm: {type:String},
        so_vm: {type:String},
        disco_duro_vm: {type: Number},
        ram_vm: {type:Number},
        cpu_vm: {type:Number},
        interfaces_vm: {type:Number},
        ip_vm: {type:Number},
        blade: {type:String},
        estado: {type:String}
    }]
});

/*Se crea el modelo (que debe interactuar con la app) para exportar y poder conectar 
con la bd, los parametros que se deben pasar son el nombre que se le quiere dar 
y el esquema el cual esta definido en una variable*/

module.exports = mongoose.model('Pool_recursos', pool_recursosSchema);