const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;
const mongoose = require('mongoose')
const cors = require('cors');


app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


let isConnected = false;





const peliculaSchema = new mongoose.Schema({
    titulo: String,
    genero: String,
    año: Number,
    duracion: Number,
    idioma: String,
    calificacion: Number,
    nc: String
}, { 
    bufferCommands: false  
});;

const Pelicula = mongoose.model("Pelicula", peliculaSchema, "peliculas");

app.get("/peliculas", async (req,res) =>{
    try{
        const peliculas = await Pelicula.find();
        res.json(peliculas);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener las películas",
            error: error.message
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



async function iniciarServidor() {
    
    try {

    await mongoose.connect("mongodb+srv://grupo:grupo@servidorprueba.ygegryf.mongodb.net/netflix");

    console.log("Conectado a MongoDB");

    app.listen(port, () => {
        console.log(`Servidor iniciado en http://localhost:${port}`);
    });

    }catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        console.error(error.message);
    }

}

iniciarServidor();