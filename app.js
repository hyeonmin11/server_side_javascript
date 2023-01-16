var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.locals.pretty = true;

app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));       //
app.get('/form', function(req,res){
    res.render('form');
});
app.get('/form_receiver', function(req,res){
    var title=req.query.title;
    var description = req.query.description
    res.send(title + ' ' + description);
});
app.post('/form_receiver', function(req,res){
    var title = req.body.title;
    var description = req.body.description;
    res.send(title+' '+description);
    res.send('Hello, Post');
});





app.get('/topic/:id', function(req,res){

    var topics = [
        'Javascript is...',
        'Nodejs is...',
        'Express is...'
    ];
    var output = `
    <a href="/topic?id=0">JavaScript</a><br>
    <a href="/topic?id=1">Nodejs</a><br>
    <a href="/topic?id=2">Express</a><br>
    ${topics[req.params.id]}
    `
    res.send(output);

})

app.get('/topic/:id/:mode', function(req,res){
    res.send(req.params.id+ ' '+req.params.mode);
});


app.get('/template', function(req,res){
    res.render('temp', {time:'hello'}); // sending temp file
});
app.get('/dynamic', function(req,res){
    var lis='';
    for(var i=0; i<5;i++){
        lis = lis + '<li>coding<\li>';
    }
    var output = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    Hello, Dynamic!
    ${lis}
</body>
</html>
    `;
    res.send(output);
})
app.get('/', function(req,res){
    res.send('Hello home page'); // when client access to home page
});
app.get('/login', function(req,res){
    res.send('Login please'); // when client access to login page
});

app.listen(3000, function(){
    console.log('Connected 3000 port!');
});