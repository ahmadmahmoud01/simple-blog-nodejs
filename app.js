const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const blogRoutes = require('./routes/blogRoutes');


// express app
const app = express();

// connect to mongodb
const dbURL = 'mongodb+srv://ahmadmahmoud:a7madm7mod@cluster0.xhdprff.mongodb.net/node-course?retryWrites=true&w=majority';
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true})
.then((result) =>  app.listen(3000))
.catch((err) =>console.log(err))



//register view engine
app.set('view engine', 'ejs');

//listen for requests

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'its a new blog 2',
        body: 'hello this is new blog 2'
    });

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
});

//get all blogs
app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        });
});

//find single blog
app.get('/single-blog', (req, res) => {
    Blog.findById('6404eeef8b3f0af538a41617')
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        });
});







//routes
app.get('/', (req, res) => {

    res.redirect('/blogs');

});

app.get('/about', (req, res) => {
    
    res.render('about', {title: 'about us'});
    
});

//blog routes
app.use('/blogs', blogRoutes);

  


//404 page
app.use((req, res) => {

    // res.sendFile('./views/404.html', {root: __dirname});
    res.render('404', {title: '404'});
    // res.status(404);

});