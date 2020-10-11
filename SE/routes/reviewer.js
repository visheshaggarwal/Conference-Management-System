const route = require('express').Router()
const Reviewer = require('../reviewer').Reviewer
const loginDb = require('../loginDb').loginDb


//--------------------- Signup Handler --------------------------//
route.get('/',function(req,res){
    res.redirect('/signupReviewer')
})

route.post('/signUp',function(req,res){
    if(req.user) {
        res.redirect('/logoutPrevSession')
    } else {
        Reviewer.create({
            emailId: req.body.emailId,
            reviewerFirstName: req.body.firstName,
            reviewerLastName: req.body.lastName,
            reviewerOrganisation : req.body.organization,
            reviewerDesignation : req.body.designation,
            password : req.body.password,
            words : 0
        })
        .then(
            loginDb.create({
                emailId: req.body.emailId,
                password : req.body.password,
                loginAs: 'reviewer'
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
