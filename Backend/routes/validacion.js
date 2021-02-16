// Validaciones
const Joi = require('@hapi/joi');

// Validacion de registro
const validacionRegistro = data => {
    const schema = Joi.object({
        nombre: Joi.string().min(3).required(),
        correo: Joi.string().min(6).required().email(),
        contraseña: Joi.string().min(6).required()
    });
    return schema.validate(data);
}

// Validacion de login
const validacionLogin = data => {
    const schema = Joi.object({
        correo: Joi.string().min(6).required().email(),
        contraseña: Joi.string().min(6).required()
    });
    return schema.validate(data);
}

module.exports.validacionRegistro = validacionRegistro;
module.exports.validacionLogin = validacionLogin;