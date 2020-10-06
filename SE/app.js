const exp = require("express");
const app = exp();
const Paper = require('./paper').Paper;
const Event = require('./event').Event;
const Attends = require('./attends').Attends;
const session = require('express-session')
const passport = require('./passport').passport

app.use(exp.json())
app.use(exp.urlencoded({extended:true}))


app.use(session({
    secret : 'qwertyuiop',
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize())
app.use(passport.session())
const reviewer = require('./routes/reviewer').route
const attendee = require('./routes/attendee').route
const reviewee = require('./routes/reviewee').route  

app.use('/reviewer',reviewer)
app.use('/attendee',attendee)
app.use('/reviewee',reviewee)  


app.use('/',exp.static(__dirname + '/public'));

// --------------------Login Logout handler ---------------------------------------------//
app.use('/login',exp.static(__dirname + '/public/login.html'));
app.use('/signupReviewer',exp.static(__dirname + '/public/signupReviewer.html'));
app.use('/signupReviewee',exp.static(__dirname + '/public/signupReviewee.html'));
app.use('/signupAttendee',exp.static(__dirname + '/public/signupAttendee.html'));

//Ik limitation hai.. Agar tune already login kar rakha hoga kisi ID se to tu dubara se login nahi kar sakta kisi aur ID se and
//tujhe koi message nahi show hoga ki already logged in
app.post('/login',
    passport.authenticate('local',{failureRedirect:'/login'}),
    function(req,res){
        res.redirect("/")
    }
);

app.use('/logoutPrevSession',exp.static(__dirname + '/public/logout.html'));
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');   // ye dekh liyo kahan redirect karna hai tune logout ke baad
});

// -------------------Creating localhost --------------------------------------------------//
app.listen(7891,()=>{
    console.log('Server Started!!');
});