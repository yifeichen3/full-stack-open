const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(express.json());

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'));

let phonebook = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/', (req, res) => {
  res.send(
    '<h1>hello world</h1>'
  );
});

app.get('/api/persons', (req, res) => {
  res.json(phonebook);
});

app.get('/info', (req, res) => {
  res.send(
    `<p>Phonebook has info for ${phonebook.length} people</p> \
    <p>${new Date()}</p>`
  )
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const p = phonebook.find(p => p.id === id);
  if (p) {
    res.json(p);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  phonebook = phonebook.filter(p => p.id !== id);
  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    res.status(404).json({error: 'name or number attribute not found'});
  }
  if (phonebook.find(p => p.name === body.name)) {
    res.status(404).json({error: 'name must be unique'});
  }
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }
  phonebook = phonebook.concat(person);
  res.json(person);
});

const generateId = () => {
  const maxId = phonebook.length > 0 ? Math.max(...phonebook.map(p => p.id)) : 0;
  return maxId + 1;
}

const PORT = 3002;
app.listen(PORT);
console.log(`listening on PORT ${PORT}`);