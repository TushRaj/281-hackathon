var express = require('express');
var app = express();
drink = require('./routes/drinks');
var port = "27017";
var mongoose  = require('mongoose');


mongoose.connect('mongodb://localhost/SFO');


app.configure(function () {
        app.use(express.bodyParser());
        app.use(express.logger('dev'));
});

app.get('/drinks', drink.findAll);
app.get('/drinks/:id', drink.findById);
app.post('/drinks', drink.adddrink);
app.put('/drinks/:id', drink.updatedrink);
app.delete('/drinks/:id', drink.deletedrink);





app.listen(port);
console.log('Listening on Port ' + port);