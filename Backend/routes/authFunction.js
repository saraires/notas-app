const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('No puede ingresar');

    try {
        const verificado = jwt.verify(token, process.env.TOKEN_SECRET);
        req.usuario = verificado;
        next();
    } catch (err) {
        res.status(400).send('Token invalido')
    }
}