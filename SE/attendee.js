const Sequelize = require('sequelize');

const db = new Sequelize({
    dialect : 'sqlite',
    storage : __dirname + '/attendee.db',
});

const Attendee = db.define('attendee',{
    emailId : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
    },
    attendeeFirstName : {
        type : Sequelize.STRING,
        allowNull : false
    },
    attendeeLastName : {
        type : Sequelize.STRING,
        allowNull : false
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false
    }
});

db.sync().then(()=>{
    console.log('Attendee Database Ready!!');
});

module.exports = {
    db,
    Attendee
}