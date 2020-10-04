const Sequelize = require('sequelize');

const db = new Sequelize({
    dialect : 'sqlite',
    storage : __dirname + '/attends.db',
});

const Attends = db.define('attends',{
    emailId : {
        type : Sequelize.STRING,
        allowNull : false
    },
    eventId : {
        type : Sequelize.STRING,
        allowNull : false
    }
});

db.sync().then(()=>{
    console.log('Attends Database Ready!!');
});

module.exports = {
    db,
    Attends
}