const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alertas_notificaciones = new Schema({
    tipo: {type: String},
    fecha: {type: Date, default: Date.now},
    descripcion: {type:String},    
    estado: {type:String, default:"Sin Atender"},
    usuario_destino: {type: String, default: "Administrador"},
    correo_usuario: {type: String, default: "diegofernandov@unicauca.edu.co"}  //Poner el correo de Admin

},{
    collection: 'alertas_notificaciones'
});

/*Se crea el modelo (que debe interactuar con la app) para exportar y poder conectar 
con la bd, los parametros que se deben pasar son el nombre que se le quiere dar 
y el esquema el cual esta definido en una variable*/

module.exports = mongoose.model('alertas_notificaciones', alertas_notificaciones);