const path =require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const express =require('express');
const cron = require('node-cron');
const morgan = require ('morgan');
const mongoose = require ('mongoose');
const axios = require('axios');
const app=express();
const exec = require('child_process').exec;
var config = require('./config');
var tokken;
var paso = 0;


//mongoose.Promise =global.Promise;
mongoose.connect('mongodb://localhost/gestiontelco',{ useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false  })
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

/*Settings*/
app.set('port', process.env.PORT || 4000);

/*Middlewares*/
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({origin: ['http://10.55.6.31:4200','http://10.55.6.39:4000']}));
app.use(bodyParser.json());

/*Routes*/
app.use('/api/alertas_notificaciones', require('./routes/alertas_notificaciones'));
app.use('/api/pool_recursos', require('./routes/pool_recursos'));
app.use('/api/recursos_telco', require('./routes/recursos_telco'));
app.use('/api/solicitudes', require('./routes/solicitudes'));
app.use('/api/sugerencias', require('./routes/sugerencias'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/enviar_correo', require('./routes/enviar_correo'));
app.use('/api/verificar_fecha_fin', require('./routes/verificar_fecha_fin'));
app.use('/api/generar_graficas', require('./routes/generar_graficas'));

app.use('/api/test', require('./routes/test'));
app.use('/api/token', require('./routes/token'));

//Recibir token de usuariio

app.get('/:token', (req, res) => {
    console.log('entra al 1');
    console.log('aqui estamos ',req.params.token)
    axios.get('http://10.55.6.31:3000/auth/verify', {headers : {'x-access-token': req.params.token,'Content-Type':'application/json'}})
        .then(res => {
            console.log('entra al 3'); 
            console.log('Se muestra la respuesta del verify del servidor ',res.data.user)
            user(res.data.user)
            })
        .catch(error => { console.log('Error en el verify del servidor '); }); 
    console.log('entra al 4');
    
    function user(data){
        console.log('entra al 5');
        if (data.role === 'guest') {
            console.log('entra al 6');
            //Se debe hacer un request para obteer los datos del projecto
            axios.get('http://localhost:4000/api/pool_recursos/unpool?emailPropietario='+data.email)
            .then(res => {
                console.log('entra al 7');
                if (res.data.status == '404' || res.data.status == '400' || res.data.content.servidor_ubicacion == 'VMware') {
                    console.log('la variable paso cuando NO hay token es ', paso)                     
                }
                else{
                    console.log('entra al 8');
                    //Generar token para usuario
                    exec('sh src/scripts/CreateToken1.sh '+res.data.content.nombre_proyecto+' '+res.data.content.nombre_proyecto+' '+res.data.content.contrasena,
                    (error, stdout, stderr) => {
                        tokken = stdout.replace('\r', '');
                        console.log('el token es ',tokken);
                    }
                    );
                }
                console.log('entra al 9');                    
            })
            .catch(error => { 
                console.log('Error en axios get proyecto ',error);                    
            });
            console.log('entra al 10');
        }
        console.log('entra al 11'); 
    }
  });

/*Server y listening */
app.listen(app.get('port'), ()=> {
    console.log('entra al 2');
    console.log('Server on port', app.get('port'));
});

//Static files
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname + '/public'));