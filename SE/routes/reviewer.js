const route = require('express').Router()
const Reviewer = require('../reviewer').Reviewer
const loginDb = require('../loginDb').loginDb
const Paper = require('../paper').Paper
var nodemailer = require('nodemailer');
const hooke = require("hookejs")
var fs = require("fs")

//--------------------- Signup Handler --------------------------//
route.get('/',function(req,res){
    res.redirect('/signupReviewer')
})

route.get('/reviewerPage',function(req,res){
    res.redirect('/reviewerPage')    
})

route.get('/papersAssigned',function(req,res){
    res.redirect('/papersAssigned')    
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

route.post('/papersAssignedData',function(req,res){
    Paper.findAll({
        where : {
            reviewerId : req.user.emailId,
            selected : "PENDING"
        }
    }).then((val) => {
        // console.log(req.user)
        // console.log(req.user.emailId)
        // console.log(val)
        console.log("paper assigned data sent")
        res.send(val)
    }) 
});

route.post('/accept',function(req,res){
    console.log("in accept")
    console.log(req.body)
    Paper.update(
        {selected: "ACCEPTED"},
        {where : {paperId:req.body.paperId}}
    ).then(() => {

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
            to: req.body.revieweeId,  // List of recipients
            subject: 'Paper Review Result', // Subject line
            text : 'Your paper on the topic ' + req.body.paperId +' is accepted!! '// Plain text body
        };
    
        transport.sendMail(message, function(err, info) {
            if (err) {
            console.log(err)
            } else {
            console.log(info);
            }
        });

        res.redirect("/reviewerPage")
    })
    
});

route.post('/reject',function(req,res){
    console.log("in reject")
    console.log(req.body)
    Paper.update(
        {selected: "REJECTED"},
        {where : {paperId:req.body.paperId}}
    ).then(() => {

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
            to: req.body.revieweeId,  // List of recipients
            subject: 'Paper Review Result', // Subject line
            text : 'Your paper on the topic ' + req.body.paperId +' is rejected!! '// Plain text body
        };
        transport.sendMail(message, function(err, info) {
            if (err) {
            console.log(err)
            } else {
            console.log(info);
            }
        });

        res.redirect("/reviewerPage")
    })
});

route.post('/plag',async function(req,res){
    report = await plagiarism(req.body.paperId)
    res.send(report)
});

function plagiarism(fileName)
{
    var str = ""
    var readMe = fs.readFileSync(fileName, 'utf-8');
        
    console.log(readMe)
    var score =  hooke.match({text: readMe})
    console.log(score[0].score)
        
    return score
}
module.exports = {route}
