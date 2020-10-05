const exp = require("express");
const app = exp();
const Paper = require('./paper').Paper;
const Event = require('./event').Event;

const Attends = require('./attends').Attends;

const passport_reviewer = require('./passport_reviewer').passport;
const reviewer = require('./routes/reviewer').route
// const reviewee = require('./routes/reviewee').route      jab passport_reviewer_reviewee and passport_reviewer_attendee ban jaaye tab inka comment hata dena           
// const attendee = require('./routes/attendee').route

const session = require('express-session');

app.use(exp.json())
app.use(exp.urlencoded({extended:true}))


app.use(passport_reviewer.initialize())
app.use(passport_reviewer.session())

app.use(session({
    secret : 'qwertyuiop',
    resave: false,
    saveUninitialized: true,
}));

app.use('/reviewer',reviewer)
// app.use('/reviewee',reviewee)   jab passport_reviewer_reviewee and passport_reviewer_attendee ban jaaye tab inka comment hata dena
// app.use('/attendee',attendee)


app.use('/',exp.static(__dirname + '/public'));

app.use('/loginReviewer',exp.static(__dirname + '/public/loginReviewer.html'));
app.use('/signupReviewer',exp.static(__dirname + '/public/signupReviewer.html'));

app.use('/loginReviewee',exp.static(__dirname + '/public/loginReviewee.html'));
app.use('/signupReviewee',exp.static(__dirname + '/public/signupReviewee.html'));

app.use('/loginAttendee',exp.static(__dirname + '/public/loginAttendee.html'));
app.use('/signupAttendee',exp.static(__dirname + '/public/signupAttendee.html'));

app.listen(7891,()=>{
    console.log('Server Started!!');
});