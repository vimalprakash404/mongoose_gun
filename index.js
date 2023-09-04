require('dotenv').config();

const mongoose = require('mongoose');
const Gun = require('gun');
const http = require('http');
const path = require('path');

const server = http.createServer();

// MongoDB Setup
mongoose.connect('mongodb://localhost/Sample', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const YourModel = mongoose.model('YourModel', {
    // Define your schema here
    _id: String,
    value: String,
  });

// Gun.js Setup
const gun = new Gun({
  file: path.join(__dirname, 'data.json'), // Where Gun.js will store its data
});


server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Example: Add data to Gun.js
gun.get('your/data/path').put({
  key: 'value',
});

// Example: Retrieve data from Gun.js
gun.get('your/data/path').once((data) => {
  console.log('Data from Gun.js:', data);
  const newData = new YourModel({
    _id: 'exampleKey',
    value: 'exampleValue',
  });
  
  newData.save()
    .then((document) => {
      console.log('Data saved to MongoDB:', document);
    })
    .catch((error) => {
      console.error('Error saving data to MongoDB:', error);
    });
});

