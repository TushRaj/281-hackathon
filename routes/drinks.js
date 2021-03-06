var mongo = require('mongodb');
mongo.BSONPure = require('bson').BSONPure;
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('drinkdb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'drinkdb' database");
        db.collection('drinks', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'drinks' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving drink: ' + id);
    db.collection('drinks', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('drinks', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.adddrink = function(req, res) {
    var drink = req.body;
    console.log('Adding drink: ' + JSON.stringify(drink));
    db.collection('drinks', function(err, collection) {
        collection.insert(drink, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updatedrink = function(req, res) {
    var id = req.params.id;
    var drink = req.body;
    console.log('Updating drink: ' + id);
    console.log(JSON.stringify(drink));
    db.collection('drinks', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, drink, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating drink: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(drink);
            }
        });
    });
}

exports.deletedrink = function(req, res) {
    var id = req.params.id;
    console.log('Deleting drink: ' + id);
    db.collection('drinks', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

var populateDB = function() {

    

    db.collection('drinks', function(err, collection) {
        collection.insert(drinks, {safe:true}, function(err, result) {});
    });

};

