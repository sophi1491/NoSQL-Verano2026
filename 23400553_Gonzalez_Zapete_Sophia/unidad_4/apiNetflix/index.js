const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;
const mongoose = require('mongoose')

app.use(express.json());

app.use(morgan("dev"));

mongoose.connect("mongodb+srv://grupo:grupo@servidorprueba.ygegryf.mongodb.net/netflix")
.then(() => {
    console.log("Conectado correctamente a MongoDB");
})
.catch((error)=>{
    console.log("Error al conectar con MongoDB: ",error);
})

const peliculaSchema = new mongoose.Schema({
    titulo: String,
    genero: String,
    año: Number,
    duracion: Number,
    idioma: String,
    calificacion: Number,
    nc: String
});

const Pelicula = mongoose.model("Pelicula", peliculaSchema, "peliculas");

app.get("/peliculas", async (req,res) =>{
    try{
        const peliculas = await Pelicula.find();
        res.json(peliculas);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener las películas",
            error: error
        });
    }
})

app.get("/peliculas/:id", async (req,res) => {
    try {
        const id = req.params.id;
        const pelicula = await Pelicula.findById(id);

        if (!pelicula) {
            return res.status(404).json({
                mensaje: "Película no encontrada"
            })  
        }
        res.json(pelicula);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener película",
            error: error
        });
    }
}) 

app.post("/peliculas", async (req,res) => {
    try{
        const { titulo, genero, año,duracion,idioma,calificacion,nc  } = req.body;
        if (!titulo || !genero || !año || !duracion || !idioma || !calificacion || !nc) {
            return res.status(400).json({
                mensaje: "Faltan datos de la película"
            });
        }
        const nuevaPelicula = new Pelicula({
            titulo, genero, año,duracion,idioma,calificacion,nc
        });

        const peliculaGuardada = await nuevaPelicula.save();

        res.status(201).json({
            mensaje: "Película registrada correctamente",
            pelicula: peliculaGuardada
        });

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener película",
            error: error
        });
    }
})

app.put("/peliculas/:id", async (req,res) => {
    try {
        const id = req.params.id;
        const { titulo, genero, año,duracion,idioma,calificacion,nc  } = req.body;
        if (!titulo || !genero || !año || !duracion || !idioma || !calificacion || !nc) {
            return res.status(400).json({
                mensaje: "Faltan datos de la película"
            });
        }

        const peliculaActualizada = await Pelicula.findByIdAndUpdate(
            id, 
            { titulo, genero, año,duracion,idioma,calificacion,nc }, 
            { new: true, runValidators: true }
        );
        
        if (!peliculaActualizada) {
            return res.status(404).json({
                mensaje: "Película no encontrada"
            });
        }

        res.json({
            mensaje: "Película actualizada correctamente",
            pelicula: peliculaActualizada
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener película",
            error: error
        });
    }
})

app.delete("/peliculas/:id", async (req,res) => {
    try {
        const id = req.params.id;
        const peliculaEliminada = await Pelicula.findByIdAndDelete(id);

        if (!peliculaEliminada) {
            return res.status(404).json({
                mensaje: "Película no encontrada"
            });
        }

        res.json({
            mensaje: "Película eliminada correctamente",
            pelicula: peliculaEliminada 
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar película",
            error: error
        });
    }
});

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});