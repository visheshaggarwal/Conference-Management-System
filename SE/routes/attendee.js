const route = require('express').Router()
const Attendee = require('../attendee').Attendee
const passport = require('../passport_attendee')

//--------------------- Signup Handler --------------------------//
route.get('/',function(req,res){
    res.redirect('/signupAttendee')    // ye banana hai tujhe
})

route.post('/signUp',function(req,res){
    console.log(req.body)
    Attendee.create({
        emailId: req.body.emailId,
        attendeeFirstName: req.body.firstName,
        attendeeLastName: req.body.lastName,
        password : req.body.password
    }).
    then(res.redirect('/loginAttendee'))    // ye bhi banana hai (html file public me bani hui hai, form bana diyo)
    .catch((err)=>{
        res.send(err)
    })
});

// ------------------------ Login Handler ----------------------//

route.post('/login',
    passport.authenticate('local',{failureRedirect:'/loginAttendee'}),
    function(req,res){
        console.log("Logging In : " + req.user.attendeeFirstName);
        return res.redirect("/");
    }
);

//------------------------Logout Handler-----------------------//

route.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');   // ye dekh liyo kahan redirect karna hai tune logout ke baad
});


module.exports = {route}