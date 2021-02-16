const router = require('express').Router();
const Note = require('../model/note');
const verify = require('./authFunction');

// consultar notas
router.get(`/consultarNotas/:id`, async (req, res) => {
    const { id } = req.params;
    const notas = await Note.find({ autor: `${id}` }).sort({prioridad: 1})
    console.log(notas);
    res.json(notas);
});

// Insertar notas
router.post('/insertarNota', async (req, res) => {
    const { nombre, prioridad, fecha_vencimiento, autor } = req.body
    const nota = new Note({
        nombre,
        prioridad,
        fecha_vencimiento,
        autor
    });
    try {
        const savedNote = await nota.save();
        res.send(savedNote);
    } catch (err) {
        res.status(400).send(err);
    }

});

// Editar Notas
router.put('/editarNota/', async (req, res) => {
    const { _id, nombre, prioridad, fecha_vencimiento, autor } = req.body;
    const notaActualizada = await Note.findByIdAndUpdate(_id, { $set: req.body }, (err, resultado) => {
        if (err) {
            console.log(err)
        }
        res.json({ 'message': resultado });
    })

});

//Eliminar Notas
router.delete('/eliminarNota/:id_nota', async (req, res) => {

    const id_nota = req.params.id_nota;
    console.log(id_nota);
    const notaEliminada = await Note.findByIdAndDelete({ _id: id_nota });
    res.json({ message: 'Tarea eliminado' })

});

// Notas Importantes 
router.get(`/notasImportantes/:id`, async (req, res) => {
    const { id } = req.params;
    const notasImportantes = await Note.find({ $and: [{ prioridad: `Alta` }, { autor: id }] });
    console.log(notasImportantes);
    res.json(notasImportantes);
});

// Notas a punto de vencerse
router.get(`/notasVencer/:id`, async (req, res) => {
    const { id } = req.params;
    const notasImportantes = await Note.find({
        $and: [
            { fecha_vencimiento: { $gte: new Date("2021-02-16") } },
            { fecha_vencimiento: { $lte: new Date("2021-02-19") } },
            { autor: id }]
    });
    console.log(notasImportantes);
    res.json(notasImportantes);
});
// const notasVencidad = await Note.find({ $and: [ { $cond: [{ $currentDate: { Date }, <true-case>, <false-case> ] }, { autor: id }] })

module.exports = router;