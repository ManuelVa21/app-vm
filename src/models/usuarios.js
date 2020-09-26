const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuariosSchema = new Schema({
    //Datos generales suscriptores
    nombre: {type:String},
    correo: {type:String},
    estado: {type: String},
    categoria_us: {type:String},
    tutor: {type:String},
    correo_tutor: {type:String},
    pool_asociado: {type:String}
});

/*Se crea el modelo (que debe interactuar con la app) para exportar y poder conectar 
con la bd, los parametros que se deben pasar son el nombre que se le quiere dar 
y el esquema el cual esta definido en una variable*/

module.exports = mongoose.model('usuarios', usuariosSchema);