const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

console.log('connecting to MongoDB')

mongoose.connect(url)
  .then(res => console.log('connected successfully'))
  .catch(error => console.log(`MongoDB connection error: ${error.message}`))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d+/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    minLength: 9
  },
})

// Even though the _id property of Mongoose objects looks like a string,
// it is in fact an object. The toJSON method we defined transforms it into
// a string just to be safe.
// the code uses automatically the defined toJSON when formatting notes to the response.
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)