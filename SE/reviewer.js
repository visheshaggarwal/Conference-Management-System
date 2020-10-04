const Sequelize = require('sequelize');

const db = new Sequelize({
    dialect : 'sqlite',
    storage : __dirname + '/reviewer.db',
});

const Reviewer = db.define('reviewer',{
    emailId : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
    },
    reviewerFirstName : {
        type : Sequelize.STRING,
        allowNull : false
    },
    reviewerLastName : {
        type : Sequelize.STRING,
        allowNull : false
    },
    reviewerDesignation : {
        type : Sequelize.STRING,
        allowNull : false
    },
    reviewerOrganisation : {
        type : Sequelize.STRING,
        allowNull : false
    },
    words : {
        type : Sequelize.INTEGER,
        allowNull : false
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false
    }
});

db.sync().then(()=>{
    console.log('Reviewer Database Ready!!');
});

module.exports = {
    db,
    Reviewer
}