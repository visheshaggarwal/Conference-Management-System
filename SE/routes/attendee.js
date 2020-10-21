const route = require('express').Router()
const Attendee = require('../attendee').Attendee
const loginDb = require('../loginDb').loginDb
const Event = require('../event').Event;
const exp = require('express')

//--------------------- Signup Handler --------------------------//
route.get('/',function(req,res){
    res.redirect('/signupAttendee')   
})

route.get('/attendeePage',function(req,res) {
    res.redirect('/attendeePage')
});

route.post('/attendeePageData',function(req,res){
    // console.log("in get")
    Event.findAll().then((val) => {
        // console.log(val)
        // console.log("NEXT")
        // console.log(val)
        // let v = (val.dataValues)
        // console.log(v);
        // Evenemfdfoim.then((val2)=>{
        //     res.send({val,val2})
        // })
        // console.log(val)
        res.send(val);
        // res.render('/attendeePage',{val:val})
    });
    // res.redirect('/attendeePage')
})

route.post('/signUp',function(req,res) {
    if(req.user) {
        res.redirect('/logoutPrevSession')
    }
    else {
        Attendee.create({
            emailId: req.body.emailId,
            attendeeFirstName: req.body.firstName,
            attendeeLastName: req.body.lastName,
            password : req.body.password
        })
        .then(
            loginDb.create({
                emailId: req.body.emailId,
                password : req.body.password,
                loginAs: 'attendee'
            })
            .then(res.redirect('/login'))    
            .catch((err)=>{
                res.send(err)
            })
        )    
        .catch((err)=>{
            res.send(err)
        })
    }
});

module.exports = {route}