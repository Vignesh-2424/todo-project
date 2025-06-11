// checkData.js

const mongoose = require('mongoose');

// Replace with your MongoDB Atlas URL
const mongoURI = 'mongodb+srv://vignesh:AlDBPPJAmlffe9x3@todolist.mhzkjda.mongodb.net/';

// Connect to the database
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'todolist' // Add your DB name here (if it exists)
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ Connection error:', err));

// Define a flexible schema (accept any fields)
const Todo = mongoose.model('Todo', new mongoose.Schema({}, { strict: false }));

// Fetch and print data
Todo.find()
  .then(data => {
    console.log('📄 Stored Todos:\n', data);
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('❌ Error fetching data:', err);
    mongoose.disconnect();
  });
