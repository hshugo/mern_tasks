const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//Crear el servidor
const app = express();
//Connect to database
conectarDB();

//enable cors
app.use(cors());

//Habilitar express.json
app.use(express.json({extended: true}))

//utilizamos el middleware
const PORT = process.env.PORT || '4008'; //3000 para el cliente

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));

app.listen(PORT, ()=>{
    console.log(`The server in runnng in the port ${PORT} `);
});
/*
app.get('/', (req,res) => {
    res.send("Hola Mundo"); 
});
*/