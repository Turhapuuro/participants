"use strict"

var express         = require('express');
var app             = express();
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser')
var session         = require('express-session');
var mongoose        = require('mongoose');
var MongoStore      = require('connect-mongo')(session);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

var Participant = require('./models/participant');

// LOCAL
var url = process.env.DATABASEURL;
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB conncetion error"));

// SET UP SESSIONS
app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 2},
    store: new MongoStore({
        mongooseConnection:db,
        ttl: 2 * 24 * 60 * 60
        })
}));

// --->>> END SESSIONS SET UP <<<---

// --->>> APIs <<<---

    // CREATE PARTICIAPNT
    app.post('/participants', function(req, res){
        var newParticipant = req.body;
        Participant.create(newParticipant, function(err, newParticipant){
            if (err){
                throw err;
            }
            res.json(newParticipant);
        })
    });

    // READ PARTICIPANTS 
    app.get('/participants', function(req, res){
        Participant.find(function(err, participants){
            if(err){
                throw err;
            }
            res.json(participants);
        })
    });

    // UPDATE PARTICIPANT
    app.put('/participants', function(req, res){
        Participant.findOneAndUpdate({_id: req.body._id}, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone
            }
        }, {new: true}, function(err, updated){
            if(err){
                throw err;
            }
            res.json(updated);
        })
    })

    // DELETE PARTICIPANT
    app.delete('/participants:_id', function(req, res){
        Participant.findByIdAndRemove(req.params._id, function(err, deletedParticipant){
            if(err){
                throw err;
            }
            res.json(deletedParticipant);
        })
    })

// --->>> APIs END <<<---

app.listen(3001, function(err){
    if (err) {
        return console.log(err);
    }
    console.log("API Server listening on http://localhost:3001");
});