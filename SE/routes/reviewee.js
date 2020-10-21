const route = require('express').Router()
const Reviewee = require('../reviewee').Reviewee
const Reviewer = require('../reviewer').Reviewer
const Paper = require('../paper').Paper
const loginDb = require('../loginDb').loginDb
const hooke = require("hookejs")
var fs = require('fs');
var nodemailer = require('nodemailer');
const sequelize = require('sequelize');

route.get('/revieweePage',function(req,res){
    res.redirect('/revieweePage')    
})

route.get('/submitPaper',function(req,res){
    res.redirect('/submitPaper')   
})

route.get('/paperStatus',function(req,res){
    res.redirect('/paperStatus')   
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

    Reviewer.findOne({
        attributes: ['emailId','words',[sequelize.fn('min', sequelize.col('words')), 'minWords']],
        raw: true,
    }).then((val) => {
        console.log(val.words,val.emailId)
        let transport = nodemailer.createTransport({
            service : "gmail",
            host: 'smtp.gmail.com',
            // port: 5500,
            // tls: {
            //     rejectUnauthorized: false
            // }
            auth: { 
               user: 'visheshaggarwal2308@gmail.com',
               pass: 'vish2308esh'
            }
        });
        // console.log(req.body);
        const message = {
            from: 'noreply@seproject.com', // Sender address
            to: val.emailId,  // List of recipients
            subject: 'Paper Review', // Subject line
            text : 'Please review ' + req.body.topic +' paper by ' + req.user.emailId, // Plain text body
        };
    
        transport.sendMail(message, function(err, info) {
            if (err) {
            console.log(err)
            } else {
            console.log(info);
            }
        });
        var str = req.body.paper
        var totalSoFar = 0;
        for (var i = 0; i < str.length; i++)
            if (str[i] === " ") { // if a space is found in str
                totalSoFar += 1; // add 1 to total so far
            }
        totalSoFar += 1;
        console.log(totalSoFar)
        Reviewer.update(
            {words: val.words + totalSoFar},
            {where : {emailId:val.emailId}}
        ).then(() => {
            console.log("UPDATED")
            Paper.create({
                topic:req.body.topic,
                category:req.body.category,
                date: req.body.date,
                reviewerId: val.emailId,
                revieweeId : req.user.emailId,
                selected : 'PENDING',
                paperId : fileName
            }).then(() => {
                console.log("Paper Created")
            })
        })
    });
    res.redirect('revieweePage');
});

route.post('/paperStatusData',function(req,res){
    Paper.findAll({
        where : {
            revieweeId : req.user.emailId
        }
    }).then((val) => {
        // console.log(req.user)
        // console.log(req.user.emailId)
        // console.log(val)
        console.log("paper status sent")
        res.send(val)
    }) 
});

module.exports = {route}