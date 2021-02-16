const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = mongoose.model('Usuario');

const noteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    prioridad: {
        type: String,
        required: true,
    },
    fecha_vencimiento: {
        type: Date,
        default: Date.now
    },
    autor: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Note', noteSchema);