const express = require('express');
const app = express();

app.use(require('cors')());
const bodyParser = require('body-parser')

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var newDb = 'trainTicketDb';
var newColl = 'ticketInfo';

app.get('/get_seat_info', function(req, res){
    MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db(newDb);
        dbo.collection(newColl).find().toArray(function(err, result) {
            if (err) throw err;
            res.status(200).send(result);
            db.close();
          });
      });
});

app.post('/book_seat', bodyParser.json(), function(req, res){
    let {
        name,
        seats
    } =  req.body;
    MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db(newDb);
        for(var i=0; i<seats.length; i++){
            dbo.collection(newColl).updateOne({seat:seats[i]}, {$set:{status:'booked', name:name}});
        }
        res.send('Updated');
    });
});

app.listen(3000, () => console.log('Server Running on port 3000'));