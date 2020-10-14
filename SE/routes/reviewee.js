const route = require('express').Router()
const Reviewee = require('../reviewee').Reviewee
const Reviewer = require('../reviewer').Reviewer
const loginDb = require('../loginDb').loginDb
const hooke = require("hookejs")
var fs = require('fs');


route.get('/revieweePage',function(req,res){
    res.redirect('/revieweePage')    
})

route.get('/submitPaper',function(req,res){
    res.redirect('/submitPaper')    
})


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

route.post('/submitNewPaper',function(req,res){
    console.log('In submit Paper reviewee')
    
    // File Saved
    var fileName = 'Papers/' + req.body.topic + '.txt'
    fs.appendFile(fileName, req.body.paper, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

    // reviewerId = () => Reviewer.findOne({
    //     attributes: ['reviewerId',[sequelize.fn('min', sequelize.col('words')), 'minPrice']],
    //     raw: true,
    // });
    // console.log(minPrice)
    // var minWords = async/await db.Reviewer.min('words')
    // console.log(minWords)
    res.redirect('revieweePage');

});

module.exports = {route}