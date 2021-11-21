require("dotenv").config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

const cors = require("cors");
var upload = require('express-fileupload');

app.use(cors());

app.use('/', express.static('public'))
app.use(upload());

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    res.json("Thanh Cong!")
})

app.post('/image', async (req, res) => {

    var fileImage = req.files.file;

    var fileName = fileImage.name

    // create path to client get image
    var fileProduct = "https://tienkim-image.herokuapp.com/" + fileName

    // move file name in folder public
    fileImage.mv('./public/' + fileName)

    res.json(fileProduct)
})
  
server.listen(PORT, () => {
    console.log('listening on *: ' + PORT);
});