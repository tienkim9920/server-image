require("dotenv").config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

const cors = require("cors");
app.use(cors());

var upload = require('express-fileupload');
app.use('/', express.static('public'))
app.use(upload());

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Using API Blogs',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:8000/'
            }
        ]
    },
    apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://tienkim9920:U4tQMg6Wfy8DaL@cluster0.rco6f.mongodb.net/Blog?retryWrites=true&w=majority")

const blogsAPI = require('./routes/blogs.routes');

app.use('/blogs', blogsAPI);

server.listen(PORT, () => {
    console.log('listening on *: ' + PORT);
});