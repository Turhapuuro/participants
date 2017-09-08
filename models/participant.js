"use strict"

var mongoose = require('mongoose');

var participantSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String
})

var Participant = mongoose.model('Participant', participantSchema);
module.exports = Participant;