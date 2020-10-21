const route = require('express').Router()
const Event = require('../event').Event

route.get('/',function(req,res){
    res.redirect('/addEvent')    // ye banana hai tujhe
})

route.post('/addNewEvent',function(req,res){
    console.log(req.body)
    Event.create({
        eventId : req.body.venue + req.body.date,
        venue : req.body.venue,
        category : req.body.category,
        date : req.body.date,
        startTime : req.body.startTime,
        duration : req.body.duration
    })
    .then(res.redirect('/addEvent'))
    .catch((err)=>{
        res.send(err)
    })
});

module.exports = {route}