const express = require('express');
const app = express();
app.use(express.json());

let students = [];
const Generator = () => new Date().getTime();

//Rutas
app.get('/students', (req, res) => {
    res.status(200).json(students);
});

app.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const studen = students.find((e) => e.id === id);
    if (studen) {
        res.status(200).json(studen);
    } else {
        res.status(404).json({ mensaje: 'Estudiante no encontrado' });
    }
});


app.listen(4321, () => {
    console.log('Servidor corriendo en el puerto 4321');
});