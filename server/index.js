const express = require('express');
const { default: mongoose } = require('mongoose');
const monogoose = require('mongoose');
const moment = require('moment');  
const app = express();
const cors = require('cors');
const eventSchema = require("./models/Events");
require('dotenv').config();

app.use(express.json());
app.use(cors());

try{
    mongoose.connect('mongodb+srv://admin:'+process.env.DBPS+'@cluster0.7yleq.mongodb.net/mlvoplanning?retryWrites=true&w=majority', {
    useNewUrlParser: true,
})

console.log("connected");

} catch(err){
    console.log(err);
}

app.get("/read", async (req, res) => {

    eventSchema.find({} , (err, result) =>{
        if(err) {
            res.send(err)
        }
        res.send(result);
    } )
})

app.delete("/delevent/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);

    eventSchema.findByIdAndDelete(id , (err, result) => {
        if(err) {
            res.send(err)
        }
        res.send(result);
    } )

})

app.get("/getbydate/:dateSelected", async (req, res) => {

    console.log("okkkk");

    const seldate = moment(req.params.dateSelected, "DD-MM-YYYY").format("DD/MM/YYYY");;
    console.log(seldate);

    eventSchema.find({eventDate: seldate} , (err, result) => {
        if(err) {
            res.send(err)
        }
        res.send(result);
    } )
})

app.post("/post", async (req, res) =>{

    
    const eventExt = req.body.eventExt;
    const eventTheme = req.body.eventTheme;
    const eventDate = req.body.eventDate;
    const eventName = req.body.eventName;
    const eventDescr = req.body.eventDescr;
    const eventHour = req.body.eventHour;
    const eventPlace = req.body.eventPlace;
    const eventAddr = req.body.eventAddr;
    const eventCons = req.body.eventCons;
    const eventMom = req.body.eventMom;

    const newEvent = new eventSchema({
        eventExt: eventExt,
        eventTheme: eventTheme,
        eventDate: eventDate,
        eventName: eventName,
        eventDescr: eventDescr,
        eventHour: eventHour,
        eventPlace: eventPlace,
        eventAddr: eventAddr,
        eventCons: eventCons,
        eventMom : eventMom,
    })

    try{
        await newEvent.save();
        res.send("new data ok !");
    }
    catch(err){
        console.log(err);
    }


});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});