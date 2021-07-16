/*
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

*/

const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");

const app = express()
const root = path.resolve(__dirname, '..')

// Log invocations
app.use(function(req, res, next) { console.log(req.url); next(); });

// Directly serve static content from /client
app.use(express.static(root + '/client'));

/*
// Simple REST API that returns some entities
app.get('/api/entities', (req,res) => 
 res.send({ entities: 
   ['Q2887', 
    'Q33986',
    'QJPI83',
    'Q15920'
   ]})
);
*/

// Simple REST API JP that returns some entities cambio OK Metodo GET Profe desde JSON
const entidades = require('./entidades.json');
console.log(entidades);
//app.get('/api/ejemplo_jp', (req,res) => { 
app.get('/api/entities', (req,res) => { 
 res.json(entidades);  
});

// Simple REST API JP that returns some entities ejemplo OK x3
const entidades_jp = require('./entidades_jp.json');
console.log(entidades_jp);

app.get('/api/entidades_jp', (req,res) => { 
 res.json(entidades_jp);  
});

//new metodo post en desarrollo
app.post('/api/entidades_jp', (req,res) => { 
const id = entidades_jp.length + 1;
const {entId, entAnotacion, entUrl} = req.body;
/*
const entId = req.body.entId;
const entAnotacion = req.body.entAnotacion;
const entUrl = req.body.entUrl;
*/
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


/*
app.post('/api/entidades_jp', function (req, res) {
  var data = req.body;
  
  console.log("entId: ", data.entId);
  console.log("entAnotacion: ", data.entAnotacion);
  console.log("entUrl: ", data.entUrl);
    
  res.send();
});
*/

/*
router.post('/', (req, res) => {
  const id = movies.length + 1;
  const { title, director, year, rating } = req.body;
  const newMovie = { ...req.body, id };
  if (id && title && director && year && rating) {
      movies.push(newMovie);
      res.json(movies);
  } else {
      res.status(500).json({error: 'There was an error.'});
  }
});
*/
module.exports = app


