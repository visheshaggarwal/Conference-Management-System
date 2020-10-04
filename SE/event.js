const Sequelize = require('sequelize');

const db = new Sequelize({
    dialect : 'sqlite',
    storage : __dirname + '/event.db',
});

const Event = db.define('event',{
    eventId : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
    },
    venue : {
        type : Sequelize.STRING,
        allowNull : false
    },
    category : {
        type : Sequelize.STRING,
        allowNull : false
    },
    date : {
        type : Sequelize.STRING,
        allowNull : false
    },
    startTime : {
        type : Sequelize.TIME,
        allowNull : false
    },
    duration : {
        type : Sequelize.INTEGER,
        allowNull : false
    }
});

db.sync().then(()=>{
    console.log('Event Database Ready!!');
});

module.exports = {
    db,
    Event
}