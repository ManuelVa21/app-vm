const mongoose = require('mongoose');
const { Schema } = mongoose;

const TestSchema = new Schema ({
    //name: String,  
    //tipo: String,
    name: {type: String},
    tipo: {type: String} 
});

module.exports = mongoose.model('Test', TestSchema);