const path =require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const express =require('express');
const morgan = require ('morgan');
const mongoose = require ('mongoose');

const app=express();

//mongoose.Promise =global.Promise;
mongoose.connect('mongodb://localhost:27017/appdatabase',{ useNewUrlParser: true })
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

/*Settings*/
app.set('port', process.env.PORT || 3000);

/*Middlewares*/
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

/*Routes*/
//app.use('/api/tasks',require('./routes/tasks'));
app.use('/alertas_notificaciones', require('./routes/alertas_notificaciones'));
app.use('/pool_recursos', require('./routes/pool_recursos'));
app.use('/recursos_telco', require('./routes/recursos_telco'));
app.use('/solicitudes', require('./routes/solicitudes'));
app.use('/sugerencias', require('./routes/sugerencias'));
app.use('/usuarios', require('./routes/usuarios'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));

/*Server y listening */
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
}); 