const route = require('express').Router()
const Reviewee = require('../reviewee').Reviewee
const passport = require('../passport_reviewee').passport
var formidable = require('formidable');
var fs = require('fs');

//--------------------- Signup Handler --------------------------//
route.get('/',function(req,res){
    res.redirect('/signupReviewee')    // ye banana hai tujhe
})

route.post('/signUp',function(req,res){
    console.log("In routes/reviewee ",req.body)
    Reviewee.create({
        emailId: req.body.emailId,
        revieweeFirstName: req.body.firstName,
        revieweeLastName: req.body.lastName,
        revieweeOrganisation : req.body.organization,
        revieweeDesignation : req.body.designation,
        password : req.body.password
    }).
    then(res.redirect('/loginReviewee'))
    .catch((err)=>{
        res.send(err)
    })
});

// ------------------------ Login Handler ----------------------//

route.post('/login',
    passport.authenticate('local',{failureRedirect:'/loginReviewee'}),
    function(req,res){
        console.log("Logging In : " + req.user.revieweeFirstName);
        return res.redirect("/revieweePage");
        // return res.redirect("/");
    }
);

//------------------------Logout Handler-----------------------//

route.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');   // ye dekh liyo kahan redirect karna hai tune logout ke baad
});

// route.post('/submitNewPaper',function(req,res){
//     console.log("In routes/reviewee ",req.body)
//     var form = new formidable.IncomingForm();
//     console.log(form);
//     form.parse(req, function (err, fields, files) {
//         res.write('File uploaded');
//         res.end();
//     });
    
//     // Reviewee.create({
//     //     emailId: req.body.emailId,
//     //     revieweeFirstName: req.body.firstName,
//     //     revieweeLastName: req.body.lastName,
//     //     revieweeOrganisation : req.body.organization,
//     //     revieweeDesignation : req.body.designation,
//     //     password : req.body.password
//     // }).
//     res.redirect('/submitPaper');
    
// });



module.exports = {route}