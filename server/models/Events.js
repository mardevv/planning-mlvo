const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    eventExt : {
        type : Boolean,
        required : true
    },
    eventTheme : {
        type : String,
        required : true
    },
    eventDate : {
        type : String,
        required : true,
    },
    eventName : {
        type : String,
        required : true
    },
    eventDescr : {
        type : String,
        required : false
    },
    eventHour : {
        type : String,
        required : true
    },
    eventPlace : {
        type : String,
        required : true
    },
    eventAddr : {
        type : String,
        required : false
    },
    eventCons : {
        type : String,
        required : false,
    },
    eventMom : {
        type : String,
        required : true,
    }

})

const Events = mongoose.model('events', eventSchema);
module.exports = Events;