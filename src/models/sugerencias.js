const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sugerencias = new Schema({
    nombre_usuario: {type: String},
    fecha: {type: Date, default: Date.now},
    descripcion: {type:String}
},{
    collection: 'sugerencias'
});

/*Se crea el modelo (que debe interactuar con la app) para exportar y poder conectar 
con la bd, los parametros que se deben pasar son el nombre que se le quiere dar 
y el esquema el cual esta definido en una variable*/

module.exports = mongoose.model('sugerencias', sugerencias);