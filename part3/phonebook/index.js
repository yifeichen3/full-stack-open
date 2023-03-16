require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');
app.use(express.json());
// use cors so the frontend can access localhost 3000 (address for the backend) from 3002
app.use(cors());
// everytime when express gets an HTTP GET request, it will first check if
// the build folder has the corresponding file. If it has, then express will return it.
app.use(express.static('build'));

// morgan logger middleware
// example: POST /api/persons 200 48 1.069 ms {"name":"Fay","number":"123-456-2347"}
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'));

const unknownEndpoint = (req, res) => {
  res.status(404).end({error: "unknown endpoint"});
}

const errorHandler = (error, req, res, next) => {
  console.log(`errorHandler ${error.message}`);
  if (error.name === 'CastError') {
    // 400 Bad Request: The request could not be understood by the server due
    // to malformed syntax. The client SHOULD NOT repeat the request without modifications.
    res.status(400).send({error: 'malformed id'});
  }
  // pass the error forward to the default Express error handler
  next(error);
}
app.get('/', (req, res) => {
  res.send(
    '<h1>hello world</h1>'
  );
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => res.json(persons));
});

app.get('/info', (req, res) => {
  Person.find({}).then(persons => {
    res.send(
      `<p>Phonebook has info for ${persons.length} people</p> \
    <p>${new Date()}</p>`
    )
  });
});

// get a person from the phonebook based on the id
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

// delete a person from the phonebook based on the id
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(error => next(error));
});

// show a list of person's information in the phonebook
app.post('/api/persons', (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    res.status(404).json({error: 'name or number attribute not found'});
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person.save().then(p => res.json(p));
});

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;
  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(req.params.id, person, {new: true})
    .then(updatedPerson => res.json(updatedPerson))
    .catch(error => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3002;
app.listen(PORT);
console.log(`listening on PORT ${PORT}`);