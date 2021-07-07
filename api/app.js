const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');

const app = express()
const root = path.resolve(__dirname, '..')

// Log invocations
app.use(function(req, res, next) { console.log(req.url); next(); });

// Directly serve static content from /client
app.use(express.static(root + '/client'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Simple REST API that returns some entities
app.get('/api/entities', (req,res) => 
 res.send({ entities: 
   ['Q2887', 
    'Q33986',
    'Q15920'
   ]})
);
app.post('/api/anotaciones', (req,res) => 
 {
   var entidad = req.body.entidadin
   var anotacion = req.body.anotacionin
  console.log("anotacion:"+anotacion+", entidad: "+entidad);
res.end("anotacion: "+anotacion+", entidad: "+entidad);
 });
module.exports = app
