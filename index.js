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

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://tienkim9920:U4tQMg6Wfy8DaL@cluster0.rco6f.mongodb.net/Blog?retryWrites=true&w=majority")

const Blog = require("./model/blog.model");

app.get('/blogs', async (req, res) => {
    const blogs = await Blog.find();
    res.json(blogs)
})

app.post('/blogs', async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.json(blog._id);
    } catch (error) {
        res.json(error);
    }
})

app.patch('/blogs', async (req, res) => {
    const { _id, title, username, body, phone } = req.body;
    let blog = await Blog.findById({ _id });
    if (title) {
        blog.title = title;
    }
    if (username) {
        blog.username = username;
    }
    if (body) {
        blog.body = body;
    }
    if (phone) {
        blog.phone = phone;
    }
    blog.save();
    res.json("Update Successfully");
})

app.delete('/blogs/:id', async (req, res) => {
    try {
        await Blog.deleteOne({ _id: req.params.id });
        res.json("Delete Successfully");
    } catch (error) {
        res.json(error);
    }
})

app.get('/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findById({ _id: req.params.id });
        res.json(blog);
    } catch (error) {
        res.json(error);
    }
})

app.post('/image', async (req, res) => {
    var fileImage = req.files.file;
    var fileName = fileImage.name
    try {
        // create path to client get image
        var fileProduct = "https://tienkim-crud.herokuapp.com/" + fileName
        // move file name in folder public
        fileImage.mv('./public/' + fileName)
        res.json(fileProduct)
    } catch (error) {
        res.json(error)
    }
})

server.listen(PORT, () => {
    console.log('listening on *: ' + PORT);
});