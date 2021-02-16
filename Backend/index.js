const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

// Rutas
const authRoute = require('./routes/auth');
const noteRoute = require('./routes/notas');
const email = require('./routes/mail');


app.use(cors());
dotenv.config();

//Conexion a la base de datos
mongoose.connect(
    process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    },
    () => console.log('Estas conectado a la base de datos'));

//Middlewares
app.use(express.json());
app.use('/', authRoute);
app.use('/', noteRoute);
app.use('/', email);


app.listen(5001, () => console.log("servidor corriendo el el puerto 5001"))