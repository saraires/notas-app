const express = require('express');
const smtpTransport = require('nodemailer-smtp-transport');
const router = express.Router();
const nodemailer = require('nodemailer');

// res.setHeader('Access-Control-Allow-Origin', '*');
// res.setHeader('Access-Control-Allow-Methods', 'POST');
// res.setHeader('Access-Control-Allow-Headers', '*');

// Configuramos transporter
let transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'bicipoint01@gmail.com',
        pass: 'bicipoint123'
    }
}));

router.post('/email', (req, res) => {

    try{
        const { nombre, correo, contraseña} = req.body;
    // var nombre = req.body.nombre,
    //     correo = req.body.correo,
    //     contraseña = req.body.contraseña

    // Configuracion inicial del nodemailer
    const mailOptions = {
        from: '<academiageek@gmail.com>',
        to: correo,
        subject: "Bienvenido a Notas-app",
        html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
        </head>
        
        <body>
    <div style="
    max-width:625px;
    margin-top:0;
    margin-left:auto;
    margin-bottom:0;
    margin-right:auto">
        <table border="0" cellpadding="0" cellspacing="0" dir="ltr" id="m_22375324755315983container" style="
            border-collapse:collapse;
            border-bottom-style:none;
            border-right-style:none;
            border-top-style:none;
            border-left-style:none;
            color: #DEDDDD;
            font-family:Helvetica,Arial,sans-serif" width="100%">
            <tbody>
                <tr>
                    <td align="left" id="m_22375324755315983preheaderRow"
                        style="line-height:1em;text-align:left;font-size:12px;padding-top:0;padding-right:0;padding-bottom:12px;padding-left:0">
                    </td>
                </tr>
                <tr>
                    <td align="left" id="m_22375324755315983logoRow"
                        style="background-color: #e9e9e9;line-height:1em;padding-bottom:18px;padding-left:13px;padding-right:13px;padding-top:24px;text-align:left"
                        valign="middle">
                        <table align="left" cellpadding="0" cellspacing="0" id="m_22375324755315983logo"
                            style="border-collapse:collapse;border-bottom-style:none;border-right-style:none;border-top-style:none;border-left-style:none;color:#337DB8;font-family:Helvetica,Arial,sans-serif"
                            width="200">
                            <tbody>
                                <tr>
                                    <td align="left" style="line-height:1em;text-align:left; display: flex;"
                                        valign="middle"><img alt="" border="0"
                                            src="https://lh3.googleusercontent.com/PQFTHUQkqWRndHv2IwWY0bDzWvjsKmC3B8ezEjTDRi0SkZ3kQH6I6uXKn5NhSZPZcDXf6Gp_T77MXtqvRTGSTbyawBz2YjeroOaqrHc8h7rhIiLe0G0uwYVLBTCF5WpQlUOU67XC2LolBmVf0QWuFazVhFHIIUb8OCxl5zW3RaOI2XkkyuOXxrq-F7LJZV7RDHW4duRL5SSdy4391LEdGGZs90gfXq5l5OUTTT3CTib891T29l8i9V63bezA72vYqDdem_bDzUnSvJ2aA8xVWL_MIqZ5DckdHb_G9UE3zr-kjCL4mh4rRABGMxsrsX190z_QVTHHrnnk_zq96IwjXZRhyFkY6eTB6ctqh9qoZn-HzPYpRFLKiM16KnogMxqZ6FM6v7609rpfFOcNaJJTgR7ef89JIvRFxe3xiRmSDJmsd2qJlJnMfhbrdIqpLwz0IY4237U8h4Xcdwr4qvn0kAp5AuAEsWte-SS1tYIJhEDdONz7R6_Oh4pKeTjxTo1hx02PUhay7jGjCo44PaHIJTmRMOQsqoDc4BqWQPYJ5yyLmOKMWcPCGBAWBvQEOxOtySUzrXFe07_RenMaixAZQqlTMnxxLGJzqktMLMdQrjWbL4GDMNYygKkk6NkJNyzmrfHN5kx45QP-ZJx06HvuPhOGp1ykCDXUBrHlZ9x10i2JM0UHMMdgyOK-tIeQikw=s512-no?authuser=0"
                                            style="margin-left: 30px; outline:none" width="70px">
                                            <h2 style="display: inline; color: black; margin-left: 10px;">Notas</h2>
                                    </td>
                                    <br />
                                </tr>
                            </tbody>
                        </table>
                        <table align="right" cellpadding="0" cellspacing="0" id="m_22375324755315983date"
                            style="border-collapse:collapse;color:#e9e9e9;font-family:Helvetica,Arial,sans-serif;font-size:16px;text-align:right!important;border-top-style:none;border-right-style:none;border-bottom-style:none;border-left-style:none"
                            width="289">
                            <tbody>
                                <tr>
                                    <td align="right" id="m_22375324755315983Edition" height="26"
                                        style="line-height:1em;text-align:right;padding-top:0;padding-right:30px;padding-bottom:0;padding-left:0"
                                        valign="middle"></td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td align="left" id="m_22375324755315983contentRow"
                        style="background-color:#e9e9e9;line-height:2em;padding-bottom:20px;padding-left:40px;padding-right:40px;padding-top:0;text-align:left">
                        <table cellpadding="0" cellspacing="0" id="m_22375324755315983moduleContainer"
                            style="border-collapse:collapse;border-bottom-style:none;border-right-style:none;border-top-style:none;border-left-style:none;color:#666666;font-family:Helvetica,Arial,sans-serif"
                            width="100%">
                            <tbody>
                                <tr>
                                    <td align="left" style="line-height:1em;text-align:left;padding-bottom:20px">
                                        <table cellpadding="0" cellspacing="0"
                                            style="border-collapse:collapse;color:#666666;font-family:Helvetica,Arial,sans-serif;border-top-color:#e9e9e9;border-right-color:#e9e9e9;border-bottom-color:#e9e9e9;border-left-color:#e9e9e9;border-top-style:solid;border-right-style:solid;border-bottom-style:solid;border-left-style:solid;border-top-width:1px;border-right-width:1px;border-bottom-width:1px;border-left-width:1px"
                                            width="100%">
                                            <tbody>
                                                <tr>
                                                    <td align="left"
                                                        style="background-color:#ffffff;line-height:1em;padding-bottom:30px;padding-left:31px;padding-right:31px;padding-top:30px;text-align:left">
                                                        <table cellpadding="0" cellspacing="0"
                                                            style="border-collapse:collapse;border-bottom-style:none;border-right-style:none;border-top-style:none;border-left-style:none;color:#666666;font-family:Helvetica,Arial,sans-serif"
                                                            width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left"
                                                                        id="m_22375324755315983IntroHeadline"
                                                                        style="line-height:26px;text-align:left;font-size:14px;font-weight:normal;padding-bottom:10px">
                                                                        <span
                                                                            style="font-family:helvetica,arial,sans-serif;font-size:14px">
                                                                            ¡Hola, ${nombre}!<br><br>
                                                                            Muchas gracias por usar nuestros servicios,
                                                                            estaremos atentos a
                                                                            cualquier inquietud que tengas con respecto
                                                                            a las funcionalidades
                                                                            de nuestra aplicación y esperamos brindarte
                                                                            el mejor servicio
                                                                            para que te sientas cómodo; te aseguramos
                                                                            que tus notas no se
                                                                            eliminaran si no lo deseas y podrás ingresar
                                                                            en cualquier momento
                                                                            y lugar que lo requieras. Estas son tus
                                                                            credenciales de ingreso,
                                                                            procura guardarlas en un lugar seguro (no se
                                                                            las digas a nadie).
                                                                            <br><br>
                                                                            <i>Credenciales</i>
                                                                            <br>
                                                                            <b>Correo: ${correo}</b>
                                                                            <br>
                                                                            <b>Contraseña: ${contraseña}</b>
                                                                            <br><br>
                                                                            Muchas Gracias<br>
                                                                            Con cariño, el grupo de desarrolladores
                                                                            Notas-app <3 </span><br
                                                                                    style="color:#666666;font-family:Verdana,Arial,Helvetica,sans-serif;font-size:14px;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:normal;letter-spacing:normal;text-align:left;text-indent:0px;text-transform:none;white-space:normal;word-spacing:0px;background-color:#ffffff">
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" id="m_22375324755315983emailCopyright"
                                        style="line-height:16px;text-align:left;padding-top:0;padding-right:30px;padding-bottom:5px;padding-left:30px">
                                        <a style="color:#000000!important;text-decoration:none; font-size: 12px;"
                                            href="#m_22375324755315983_">© Todos los derechos reservados Academia Geek
                                            2021</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>
        
        </html>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            console.log("ESTO ES ERROR")
            return res.send("error")
        } else {
            console.log(`sent: ${info.response}`);
            return res.send("Revisa tu bandeja de entrada")
        };
    });
} catch(e){
    console.log(e);
    console.log("ESTO NO ESTA FUNCIONANDO")
}


});

module.exports = router;