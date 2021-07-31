//CODIGO validado

const express = require('express');
const app = express()

const path = require('path');
const bodyParser = require("body-parser");
const root = path.resolve(__dirname, '..')

const _ = require('underscore');

// Log invocations
app.use(function(req, res, next) { console.log(req.url); next(); });

// Directly serve static content from /client
app.use(express.static(root + '/client'));

/*
// Simple REST API that returns some entities EJEMPLO
app.get('/api/entities', (req,res) => 
 res.send({ entities: 
   ['Q2887', 
    'Q33986',
    'QJPI83',
    'Q15920'
   ]})
);
*/

// Simple REST API that returns some entities EJEMPLO + modificacion GET JSON simple
const entidades = require('./entidades.json');
console.log("entidades JSON simple");
console.log(entidades);
app.get('/api/entidades', (req,res) => { 
 res.json(entidades);  
});


// Simple REST API that returns some entities CAPITALES WIKIDATA
const capitales = require('./capitales.json');
console.log("ciudades wikidata");
console.log(capitales);
app.get('/api/capitales', (req,res) => { 
 res.json(capitales);  
});


// Simple REST API that returns some entities EJEMPLO + modificacion GET JSON compuesto
const entidades_jp = require('./anotaciones.json');
console.log("anotaciones JSON compuesto");
console.log(entidades_jp);
app.get('/api/anotaciones', (req,res) => { 
 res.json(entidades_jp);  
});

//new metodo post en desarrollo
app.post('/api/anotaciones', (req,res) => { 
  const id = entidades_jp.length + 1;
  const {entId, entAnotacion, entUrl} = req.body;
  const newEnt = { ...req.body, id };
  //console.log(newEnt);
  if (entId && entAnotacion && entUrl) { //si falta un dato
    //const new_ent = {...req.body};
  //  console.log(newEnt);
      entidades_jp.push(newEnt);
      res.json(entidades_jp);
  } else {
      //res.status(500).json({error: 'There was an error.'});
    res.send("error");
          }
  //  res.send("recibido");
  });

module.exports = app
