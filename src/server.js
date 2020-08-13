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
//app.use('/api/tasks',require('./routes/tasks'));
app.use('/api/alertas_notificaciones', require('./routes/alertas_notificaciones'));
app.use('/api/pool_recursos', require('./routes/pool_recursos'));
app.use('/api/recursos_telco', require('./routes/recursos_telco'));
app.use('/api/solicitudes', require('./routes/solicitudes'));
app.use('/api/sugerencias', require('./routes/sugerencias'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/enviar_correo', require('./routes/enviar_correo'));

app.use('/api/test', require('./routes/test'));
app.use('/api/token', require('./routes/token'));

//Recibir token de usuariio
app.get('/:token', (req, res) => {
    console.log('aqui estamos ',req.params)
    axios.get('http://10.55.6.31:3000/auth/verify', {headers : {'x-access-token': req.params.token,'Content-Type':'application/json'}})
    .then(res => { 
        console.log('Se muestra la respuesta del verify del servidor ',res.data.user)
        user(res.data.user)
        })
    .catch(error => { console.log('Error en el verify del servidor ',error); });
    res.redirect('/?'+req.params.token);

    function user(data){
        console.log('se ingresa a funcion user ', data)
        if (data.role === 'guest') {
            console.log('Se ingresa a panel usuario ')
            //Se debe hacer un request para obteer los datos del projecto
            axios.get('/api/pool_recursos/unpool?emailPropietario='+data.email)
            .then(res => {
                if (res.data.status == '404' || res.data.status == '400') {
                    console.log('No hay proyecto aun registrado con este correo, recargue la pagina o ralice la solicitud de uno')                      
                }
                else{
                    //Generar token para usuario
                    console.log('Se genera el token para el usuario')
                    const myShellScript = exec('sh src/scripts/CreateToken.sh '+res.data.nombre_proyecto+' '+res.data.nombre_proyecto+' '+res.data.contrasena);
                    myShellScript.stdout.on('data', (data)=>{
                        //console.log('Aqui la data')
                        //console.log(data); 
                    });
                    var task = cron.schedule('39 * * * *', () =>  {
                        exec('sh src/scripts/CreateToken.sh '+config.OS_USERNAME+' '+config.OS_PROJECT_NAME+' '+config.OS_PASSWORD+'> /home/gestion/app-vm/src/app/components/PanelAdmin/TokenProjects.txt');
                    }, {
                        scheduled: false
                    });
                    task.start();

                }                    
            })
            .catch(error => { 
                console.log('Error en axios get proyecto',error);                    
            });
            //Enviar evento para usuario
            //res.redirect('/?'+req.params.token);
        } else {
            console.log('Se ingresa a panel admin')
            //Generar token para admin
            const myShellScript = exec('sh src/scripts/CreateToken.sh '+config.OS_USERNAME+' '+config.OS_PROJECT_NAME+' '+config.OS_PASSWORD);
            myShellScript.stdout.on('data', (data)=>{
                console.log('Aqui la data ',data)
            });
            var task = cron.schedule('16 * * * *', () =>  {
                exec('sh src/scripts/CreateToken.sh '+config.OS_USERNAME+' '+config.OS_PROJECT_NAME+' '+config.OS_PASSWORD+'> /home/gestion/app-vm/src/app/components/PanelAdmin/Token.txt');
            }, {
                scheduled: false
            });
            task.start();
            //res.redirect('/?'+req.params.token);

        }
    }
    
  });


/*Server y listening */
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
    /*
    //Se crea el token    
    const myShellScript = exec('sh src/scripts/CreateToken.sh '+config.OS_USERNAME+' '+config.OS_PROJECT_NAME+' '+config.OS_PASSWORD);
    myShellScript.stdout.on('data', (data)=>{
        console.log('Aqui la data ',data)
    });
    myShellScript.stderr.on('data', (data)=>{
        console.log('Aqui el error ',data)
    });

    var task = cron.schedule('51 * * * *', () =>  {
        exec('sh src/scripts/CreateToken.sh '+config.OS_USERNAME+' '+config.OS_PROJECT_NAME+' '+config.OS_PASSWORD+'> /home/gestion/app-vm/src/app/components/PanelAdmin/Token.txt');
      }, {
        scheduled: false
      });
      task.start();*/
});


//Static files
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname + '/public'));