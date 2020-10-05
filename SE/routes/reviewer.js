const route = require('express').Router()
const Reviewer = require('../reviewer').Reviewer
const passport = require('../passport_reviewer').passport

//--------------------- Signup Handler --------------------------//
route.get('/',function(req,res){
    res.redirect('/signupReviewer')
})

route.post('/signUp',function(req,res){
    console.log(req.body)
    Reviewer.create({
        emailId: req.body.emailId,
        reviewerFirstName: req.body.firstName,
        reviewerLastName: req.body.lastName,
        reviewerOrganisation : req.body.organization,
        reviewerDesignation : req.body.designation,
        password : req.body.password,
        words : 0
    })
    .then(res.redirect('/loginReviewer'))
    .catch((err)=>{
        res.send(err)
    })
});


// ------------------------ Login Handler ----------------------//

route.post('/login',
    passport.authenticate('local',{failureRedirect:'/loginReviewer'}),
    function(req,res){
        console.log("Logging In : " + req.user.reviewerFirstName);
        return res.redirect("/");
    }
);

//------------------------Logout Handler-----------------------//

route.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');   // ye dekh liyo kahan redirect karna hai tune logout ke baad
});

module.exports = {route}
