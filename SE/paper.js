const Sequelize = require('sequelize');

const db = new Sequelize({
    dialect : 'sqlite',
    storage : __dirname + '/paper.db',
});

const Paper = db.define('papers',{
    paperId : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
    },
    topic : {
        type : Sequelize.STRING,
        allowNull : false
    },
    category : {
        type : Sequelize.STRING,
        allowNull : false
    },
    selected : {
        type : Sequelize.STRING,
        allowNull : false
    },
    reviewerId : {
        type : Sequelize.STRING,
        allowNull : false
    },
    revieweeId : {
        type : Sequelize.STRING,
        allowNull : false
    },
    date : {
        type : Sequelize.STRING,
        allowNull : false
    }
});

db.sync().then(()=>{
    console.log('Paper Database Ready!!');
});

module.exports = {
    db,
    Paper
}
