const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3001;


app.use(morgan('combined'));


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

app.get("/calculadora/:operacion/:a/:b",(req,res) => {
    const { operacion, a, b } = req.params;
    let resultado;
    switch(operacion){
        case "suma": 
        resultado = parseFloat(a) + parseFloat(b);
        break;
        case "resta": 
        resultado = parseFloat(a) - parseFloat(b);
        break;
        case "multiplicacion": 
        resultado = parseFloat(a) * parseFloat(b);
        break;
        case "division": 
        resultado = parseFloat(a) / parseFloat(b);
        break;
    };

    res.send(`<p> Resultado es: ${resultado}</p>`);
});

app.get("/tabla/:numero",(req,res) =>{
    const {numero} = req.params;
    let tabla = `<h1>Tabla de multiplicar del ${numero}</h1>`;
    for(let i = 1;i<=10; i++){
        tabla += ` <p> &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;${numero} x ${i} = ${numero * i}</p>`;
    }
    res.send(tabla);
});


app.get ('/calificacion/:nota',(req,res)=>{
    const {nota} = req.params;
    let mensaje;
    if(nota >= 90){
        mensaje = "Exelente";
    }else if(nota >= 80){
        mensaje = "Muy bien";
    }
    else if(nota >= 70){
        mensaje = "Aprobado";
    }
    else{
        mensaje = "Reprobado";
    }
    res.send(`<p> Tu calificación es: ${mensaje}</p>`);
});



app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});