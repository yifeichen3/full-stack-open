const mongoose = require('mongoose')

// node mongo.js yourpassword "Arto Vihavainen" 045-1232456
if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('Error: command line need to be: node mongo.js yourpassword ["Arto Vihavainen" 045-1232456]')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.3czeq10.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(persons => {
    console.log('phonebook:')
    persons.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  person.save().then(p => {
    console.log(`added ${p.name} number ${p.number} to phonebook`)
    mongoose.connection.close()
  })
}
