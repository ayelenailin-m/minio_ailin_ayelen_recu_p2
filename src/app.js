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

const validateEstudent = (req, res, next) => {
    const { fullName, age, curse } = req.body;

    if (typeof fullName !== 'string' || fullName === '' || !Number.isInteger(age) || age < 11 || age > 20 || typeof curse !== 'string' || curse === '') {
        return res.status(400).json({
            mensaje: "Datos inválidos. 'fullName' y 'curse' deben ser una cadena de texto no vacía, 'age' debe ser un número entero entre 11 y 20."
        });
    }
    req.body.fullName = fullName.trim();
    next();
};
app.post('/students', validateEstudent, (req, res) => {
    const id = Generator();
    const { fullName, age, curse } = req.body;

    const exists = students.find((e) => e.fullName === fullName);
    if (exists) {
        return res.status(409).json({ mensaje: 'Este estudiante ya existe en la lista' });
    }

    const newStudent = { id, fullName, age, curse };
    students.push(newStudent);
    res.status(201).json({ mensaje: 'Estudiante agregado con éxito', Estudiante: newStudent });
});


app.listen(4321, () => {
    console.log('Servidor corriendo en el puerto 4321');
});