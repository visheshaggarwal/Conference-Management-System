const route = require('express').Router()
const Reviewee = require('../reviewee').Reviewee
const loginDb = require('../loginDb').loginDb


//--------------------- Signup Handler --------------------------//
route.get('/',function(req,res){
    res.redirect('/signupReviewee')    
})

route.post('/signUp',function(req,res){
    console.log('In signup reviewee')
    console.log(req.user)
    if(req.user) {
        res.redirect('/logoutPrevSession')
    } else {
        Reviewee.create({
            emailId: req.body.emailId,
            revieweeFirstName: req.body.firstName,
            revieweeLastName: req.body.lastName,
            revieweeOrganisation : req.body.organization,
            revieweeDesignation : req.body.designation,
            password : req.body.password
        }).
        then(
            loginDb.create({
                emailId: req.body.emailId,
                password : req.body.password,
                loginAs: 'reviewee'
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