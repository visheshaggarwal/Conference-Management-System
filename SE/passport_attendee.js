const passport = require('passport');
const strategy = require('passport-local').Strategy;
const Attendee = require('./attendee').Attendee;

passport.use(new strategy( {
        usernameField: 'emailId',
        passwordField: 'password'
    },
    function(emailId,password,done){
        console.log('nahi aaya is baar bhi')
        Attendee.findOne({
            where : {
                emailId : emailId
            }
        })
        .then((user)=>{
            if(!user){
                console.log('You havent signed up buddy!!');
                return done(null,false,{message : 'Incorrect UserName'});
            }
            if(user.password != password){
                console.log('MisMatch!\nTry Again!!');
                return done(null,false,{message : 'Incorrect Password'});
            }
            user.part = 'attendee'      //aise hi attendee me dalna attendee and reviewee me reviewee
            console.log(user)
            return done(null,user)
        })
        .catch(done)
    }
));

passport.serializeUser(
    function(attendee,done){
        done(null,attendee.emailId);
    }
);

passport.deserializeUser(
    function(emailId,done){
    Attendee.findOne({
         where : { emailId : emailId }
    }).then((user)=>{
        if(!user){
            return done(new Error('No Such User'));
        }
       return done(null,user);
    }).catch((err)=>{
        done(err);
    });
});

module.exports = {passport}