const router = require('express').Router();
const Usuario = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validacionRegistro, validacionLogin } = require('./validacion');
const { json } = require('express');

// Ingresar
router.post('/', async (req, res) => {

    // Validacion con Joi
    const { error } = validacionLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    // Traemos las variables del body
    const { correo, contraseña } = req.body;

    // El correo existe?
    const usuarioValido = await Usuario.findOne({ correo: correo });
    if(!usuarioValido) return res.status(400).send('El correo o la contraseña son incorrectos');

    // La contraseña si es la correcta?
    const contraseñaValida = await bcrypt.compare(contraseña, usuarioValido.contraseña)
    if(!contraseñaValida) return res.status(400).send('La contraseña son incorrectos');
    
    // Creamos y asignamos un token
    const token = jwt.sign({_id: usuarioValido._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).json(usuarioValido);
});

// Registrarse
router.post('/registro', async (req, res) => {

    // Validacion con Joi
    const { error } = validacionRegistro(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Validacion de correo existente 
    const emailExistente = await Usuario.findOne({ correo: req.body.correo });
    if (emailExistente) return res.status(400).send('El correo ya existe');
    

    // Encriptacion de contraseña
    const salt = await bcrypt.genSalt(10);
    const hashContraseña = await bcrypt.hash(req.body.contraseña, salt);

    // Creacion de nuevo Usuario
    const { nombre, correo } = req.body
    const usuario = new Usuario({
        nombre,
        correo,
        contraseña: hashContraseña
    });
    try {
        const savedUser = await usuario.save();
        res.status(200).send(savedUser);
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }

});

module.exports = router;