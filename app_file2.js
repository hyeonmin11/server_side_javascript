var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');


var app = express();
app.locals.pretty = true;
app.use(bodyParser.urlencoded({extended:false}));


app.set('views', './views_file');  // set directory where save template files
app.set('view engine', 'jade');  // will use jade template

app.get(['/topic', '/topic/:id'], function(req,res){
    fs.readdir('data', function(err, files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }

        var id = req.params.id;
        if(id){
            fs.readFile('data/'+id, 'utf8', function(err,data){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('view', {topics:files, title:id, description:data});
            }); 
        }else{
            res.render('view', {topics:files, title:'Welcome', description:'Hello, JavasScript for server.'});
        }
        
    });
    
});

app.get('/topic/new', function(req,res){
    res.render('new');
});

/*
app.get('/topic/new', function(req,res){
    fs.readdir('data', function(err, files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('new', {topics:files});
    });
    
});
*/

/*
app.get('/topic/:id', function(req,res){


    var id = req.params.id;
    fs.readdir('data', function(err, files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        fs.readFile('data/'+id, 'utf8', function(err,data){
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            res.render('view', {topics:files, title:id, description:data});
        });
    });



});

*/

app.post('/topic', function(req,res){
    var title = req.body.title;
    var description = req.body.description;

    fs.writeFile('data/'+title, description, function(err){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.redirect('/topic/'+title);  // << else statement of above if statement
    })
    
});
app.listen(3000, function(){
    console.log('Connected, 3000 port!');
});