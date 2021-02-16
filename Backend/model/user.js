const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        min: 3
    },
    correo: {
        type: String,
        required: true,
        min: 10
    },
    contraseña: {
        type: String,
        required: true,
        min: 6,
        max: 300
    }
});

module.exports = mongoose.model('Usuario', userSchema)