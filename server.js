const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    

    const num = _.random(0, 30);

    console.log(num);


    // set header content type
    // res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Type', 'text/html');

    let path = './views/';

    switch(req.url){

        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;

        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;

        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;

        default:
            path += '404.html';
            res.statusCode = 404;
            break;

    }




    // res.write('hello Ahmad');
    // res.write('<h2>hello Ahmad</h2>');

    fs.readFile(path, (err, data) => {

        if(err) {

            console.log(err);
            res.end();

        } else {

            res.write(data);
            res.end();

        }

    })

});

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});