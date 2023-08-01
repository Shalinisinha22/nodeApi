const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors=require("cors");
const data = require('./data.json');
const app = express();
app.use(cors())
const port =process.env.PORT || 3000;

// Set the static folder to serve images
app.use(express.static(path.join(__dirname, 'images')));

// Middleware to parse JSON request bodies
app.use(express.json());

// Multer storage configuration to upload files (if required)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'images'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// API endpoint to retrieve JSON data containing image references
app.get('/', (req, res) => {

  res.send(data);
});

// // API endpoint to upload an image (if required)
// app.post('/api/upload', upload.single('image'), (req, res) => {
//   res.json({ message: 'Image uploaded successfully!' });
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
