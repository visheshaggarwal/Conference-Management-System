const route = require('express').Router()
const Attendee = require('../attendee').Attendee
const loginDb = require('../loginDb').loginDb



//--------------------- Signup Handler --------------------------//
route.get('/',function(req,res){
    res.redirect('/signupAttendee')   
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