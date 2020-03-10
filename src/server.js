const path =require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const express =require('express');
const morgan = require ('morgan');
const mongoose = require ('mongoose');
const axios = require('axios');

const app=express();

//mongoose.Promise =global.Promise;
mongoose.connect('mongodb://localhost/gestiontelco',{ useUnifiedTopology: true, useNewUrlParser: true })
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

/*Settings*/
app.set('port', process.env.PORT || 4000);

/*Middlewares*/
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get('/:token', (req, res) => {
    console.log('aqui estamos')
    console.log(req.params)
    res.redirect('/?'+req.params.token);
    /*
    axios.get('http://10.55.6.31:3000/auth/verify', {headers : {'x-access-token': req.params.token,'Content-Type':'application/json'}})
    .then(res => { 
        console.log('Se muestra la respuesta del axios en el servidor ')
        //console.log(res.data.user)
        user(res.data.user)
        })
    .catch(error => { console.log('Error en el axios del servidor ',error); });
    function user(data){
        console.log('se ingresa a funcion user ', data)
        if (data.role === 'guest') {
            console.log('Se ingresa a panel usuario ')
            res.redirect('/');
        } else {
            console.log('Se ingresa a panel admin')
        }
    }
    */
  });


/*Routes*/
//app.use('/api/tasks',require('./routes/tasks'));
app.use('/api/alertas_notificaciones', require('./routes/alertas_notificaciones'));
app.use('/api/pool_recursos', require('./routes/pool_recursos'));
app.use('/api/recursos_telco', require('./routes/recursos_telco'));
app.use('/api/solicitudes', require('./routes/solicitudes'));
app.use('/api/sugerencias', require('./routes/sugerencias'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/test', require('./routes/test'));
app.use('/api/token', require('./routes/token'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname + '/public'));

/*Server y listening */
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
}); 