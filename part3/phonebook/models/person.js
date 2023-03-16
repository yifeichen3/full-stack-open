const mongoose = require('mongoose');

const url = process.env.MONGODB_URL;

console.log('connecting to MongoDB');

mongoose.connect(url)
  .then(res => console.log('connected suscessfully'))
  .catch(error => console.log(`MongoDB connection error: ${error.message}`));

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

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
});

module.exports = mongoose.model('Person', personSchema);