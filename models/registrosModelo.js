const mongoose = require('mongoose')

const Schema = mongoose.Schema

const registrosSchema = new Schema ({
    codigo: {
        type: String,
        required: true,
        unique: true
    },
    estado_ingreso: {
        type: String,
        required: true
    },
    user_id: {
      type: String,
      require:true
    }
}, {timestamps: true})


module.exports = mongoose.model('Registro', registrosSchema)

