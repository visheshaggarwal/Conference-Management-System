const Sequelize = require('sequelize');

const db = new Sequelize({
    dialect : 'sqlite',
    storage : __dirname + '/reviewee.db',
});

const Reviewee = db.define('reviewee',{
    emailId : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
    },
    revieweeFirstName : {
        type : Sequelize.STRING,
        allowNull : false
    },
    revieweeLastName : {
        type : Sequelize.STRING,
        allowNull : false
    },
    revieweeDesignation : {
        type : Sequelize.STRING,
        allowNull : false
    },
    revieweeOrganisation : {
        type : Sequelize.STRING,
        allowNull : false
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false
    }
});

db.sync().then(()=>{
    console.log('Reviewee Database Ready!!');
});

module.exports = {
    db,
    Reviewee
}