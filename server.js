var express = require('express'),
    drink = require('./routes/drinks');

var app = express();

app.configure(function () 


{
        app.use(express.bodyParser());
        app.use(express.logger('dev'));
});

app.get('/drinks', drink.findAll);
app.get('/drinks/:id', drink.findById);
app.post('/drinks', drink.adddrink);
app.put('/drinks/:id', drink.updatedrink);
app.delete('/drinks/:id', drink.deletedrink);

app.listen(3000);
console.log('Connected to the port 3000...');