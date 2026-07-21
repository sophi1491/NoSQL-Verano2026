const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;
const mongoose = require('mongoose'); 


app.use(morgan('dev'));

mongoose.connect("mongodb:/127.0.0.1:27017/escuela")
.then(() => {
    console.log("Conectado correctamente a MongoDB");
})
.catch((error) => {
    console.error("Error al conectar con MongoDB:", error);
})

const alumnoShema = new mongoose.Schema(
    {
        nombre:{type: String, required: true, trim: true},
        carrera:{type: String, required: true, trim: true},
        semestre:{type: String, required: true, min: 1}
    },{
        timestamps: true
    }
);

const Alumno = mongoose.model("Alumno",alumnoShema,"alumnos");

app.get("/alumno", async (req, res) => {
    try{
        const alumnos = await Alumno.find();
        res.json(alumnos);
    }catch{
        res.status(500).json({
                mensaje: "Error al obtener los alumnos",
                error: error
        })
    }
});


app.put("/alumno/:id", async (req, res) => {
    try{
        const alumnos = await Alumno.find();
        res.json(alumnos);
    }catch{
        res.status(500).json({
                mensaje: "Error al obtener los alumnos",
                error: error
        })
    }
});

app.post("/alumno", async (req, res) => {
    try{
        const alumnos = await Alumno.find();
        res.json(alumnos);
    }catch{
        res.status(500).json({
                mensaje: "Error al obtener los alumnos",
                error: error
        })
    }
});

app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});


app.get("/pagina", (req, res) => {
    res.send(`
        <h1 class="h1">¡Bienvenido a mi página!</h1>
        <p>Esta es una página de ejemplo creada con Express.js.</p> `);
});
/*
app.get("/alumno", (req, res) => {
    res.json({
        nombre: "Sophia",
        apellido: "Gonzalez Zapete",
        edad: 20,
        carrera: "Ingeniería en Computación"
    });
});

app.get("/materias", (req, res) => {
    const materias = [
        { nombre: "Matemáticas", creditos: 4 },
        { nombre: "Programación", creditos: 3 },
        { nombre: "Bases de Datos", creditos: 3 },
        { nombre: "Inteligencia Artificial", creditos: 4 }
    ];
    res.json(materias);
});


app.get("/mensaje/:nombre", (req, res) => {
    const { nombre } = req.params;
    res.send(`<p>¡Hola, ${nombre}!</p>`);
});*/

/*app.get("/suma/:num1/:num2", (req, res) => {
    const { num1, num2 } = req.params;
    const suma = parseFloat(num1) + parseFloat(num2);
    res.send(`<p>La suma de ${num1} y ${num2} es: ${suma}</p>`);
});
*/


app.get("/par/:numero", (req, res) => {
    const { numero } = req.params;
    const esPar = parseInt(numero) % 2 === 0;
    res.send(`<p> ${numero} es ${esPar ? 'par' : 'impar'}.</p>`);
});


app.get("/edad/:edad",(req,res) => {
    const { edad } = req.params;
    const esMayor = parseInt(edad) >= 18;
    res.send(`<p> Eres ${esMayor ? 'Mayor' : 'Menor'} de edad.</p>`)

});


app.delete("/alumno/id:", (req,res) => {
try{    
    const id = Number(req.params.id);
    const alumno = Alumno.findById(id);
    if(!alumno){
        return res.status(404).json({
                mensaje: "Alumno no encontrado"
        });
    }
    res.json(alumno);
}catch{
    return res.status(500).json({
                mensaje: "Error al encontrar al alumno"
        });

}
    

});


/*app.get("/aleatorio", (req, res) => {
    const numeroAleatorio = Math.floor(Math.random() * 100) + 1;
    res.send(`<p>El número aleatorio generado es: ${numeroAleatorio}</p>`);
});*/

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});