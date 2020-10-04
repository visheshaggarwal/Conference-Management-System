const exp = require("express");
const app = exp();
const Paper = require('./paper').Paper;
const Event = require('./event').Event;
const Reviewee = require('./reviewee').Reviewee;
const Reviewer = require('./reviewer').Reviewer;
const Attends = require('./attends').Attends;
const Attendee = require('./attendee').Attendee;
const passport = require('./passport');

const session = require('express-session');

app.use(exp.json())
app.use(exp.urlencoded({extended:true}))

// app.use(session({
//     secret : 'qwertyuiop',
//     resave: false,
//     saveUninitialized: true,
// }));

// app.get('/',(req,res)=>{
//     res.send('HELLO WORLD');
// });
app.use(passport.initialize());
app.use(passport.session());


app.use('/',exp.static(__dirname + '/public'));
app.use('/loginReviewer',exp.static(__dirname + '/public/loginReviewer.html'));

app.post('/signUpReviewer',function(req,res){
    console.log(req.body)
    Reviewer.create({
        emailId: req.body.emailId,
        reviewerFirstName: req.body.firstName,
        reviewerLastName: req.body.lastName,
        reviewerOrganisation : req.body.organization,
        reviewerDesignation : req.body.designation,
        password : req.body.password,
        words : 0
    }).
    then(res.send("SUCCESS"))
    .catch((err)=>{
        res.send(err)
    })
});

app.post('/signUpReviewee',function(req,res){
    console.log(req.body)
    Reviewee.create({
        emailId: req.body.emailId,
        revieweeFirstName: req.body.firstName,
        revieweeLastName: req.body.lastName,
        revieweeOrganisation : req.body.organization,
        revieweeDesignation : req.body.designation,
        password : req.body.password
    }).
    then(res.send("SUCCESS"))
    .catch((err)=>{
        res.send(err)
    })
});

app.post('/signUpAttendee',function(req,res){
    console.log(req.body)
    Attendee.create({
        emailId: req.body.emailId,
        attendeeFirstName: req.body.firstName,
        attendeeLastName: req.body.lastName,
        password : req.body.password
    }).
    then(res.send("SUCCESS"))
    .catch((err)=>{
        res.send(err)
    })
});

app.post('/loginReviewers', (req,res) => passport.authenticate('local', { successRedirect: '/', failureRedirect: '/loginReviewer', })(req,res));


app.listen(5500,()=>{
    console.log('Server Started!!');
});
