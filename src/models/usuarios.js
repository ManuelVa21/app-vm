const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarios = new Schema({
    //Datos generales suscriptores
    nombre: {type:String},
    correo: {type:String},
    contrasena: {type:String},
    new:{type:Boolean, default: true},
    categoria_us: {type:String},
    registro:[
        {fecha_ingreso: {type: Date, default: Date.now}}
    ],    
    //Documento tipo usuario estudiante
    codigo_us: {type:Number},
    nombre_proy: {type:String},
    tutor_proy: {type:String},
    correo_tutor: {type:String},
    //Documeto tipo usuario docente
    proposito: {type:String},
    //Documento tipo usuario curso
    nombre_curso: {type:String},
    codigo_curso: {type:String},
    cantidad_estudiantes: {type:Number},
    horrio_uso: {type:String}    
},{
    collection: 'usuarios'
});

/*Se crea el modelo (que debe interactuar con la app) para exportar y poder conectar 
con la bd, los parametros que se deben pasar son el nombre que se le quiere dar 
y el esquema el cual esta definido en una variable*/

module.exports = mongoose.model('usuarios', usuarios);