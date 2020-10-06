const Sequelize = require('sequelize');

const db = new Sequelize({
    dialect : 'sqlite',
    storage : __dirname + '/loginDb.db',
});

const loginDb = db.define('loginDb',{
    emailId : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false
    },
    loginAs: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

db.sync().then(()=>{
    console.log('Reviewee Database Ready!!');
});

module.exports = {
    db,
    loginDb
}