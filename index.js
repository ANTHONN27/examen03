const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');

const app = express();

app.use(express.json()); 
app.use(bodyParser.json()); 

const config = {
    server: 'localhost',
    database: 'ProductosDB',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
};

app.post('/producto', async (req, res) => {
    console.log('BODY RECIBIDO:', req.body);

    const { nombre, codigo } = req.body;

    try {
        await sql.connect(config);

        const result = await sql.query`SELECT * FROM Productos WHERE codigo = ${codigo}`;

        if (result.recordset.length > 0) {
            return res.status(400).json({ mensaje: 'Producto con ese código ya existe' });
        }

        await sql.query`INSERT INTO Productos (nombre, codigo) VALUES (${nombre}, ${codigo})`;
        res.status(201).json({ mensaje: 'Producto creado correctamente' });

    } catch (error) {
        console.error('Error en la conexión:', error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
