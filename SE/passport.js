const passport = require('passport');
const strategy = require('passport-local').Strategy;
const loginDb = require('./loginDb').loginDb;

passport.use(new strategy( {
        usernameField: 'emailId',
        passwordField: 'password',
        passReqToCallback: true
      },
    function(req,emailId,password,done){
        if(req.user) {
            return done(null,false,{message : 'Already Logged In'});
        }
        loginDb.findOne({
            where : {
                emailId : emailId,
                loginAs : req.body.loginAs
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
            user.part = req.body.loginAs     
            return done(null,user)
        })
        .catch(done)
    }
));

passport.serializeUser(
    function(loginDb,done){
        done(null,loginDb.emailId);
    }
);

passport.deserializeUser(
    function(emailId,done){
    loginDb.findOne({
         where : { 
            emailId : emailId
        }
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