const config = require('../config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { 
        dialect: 'mysql',
        logging: false 
    });

    // init models and add them to the exported db object
    db.Subscriber = require('../subscribers/subscriber.model')(sequelize);

    // sync all models with database
    await sequelize.sync({ alter: true });

    // Test the connection
    try {
        await sequelize.authenticate()
        console.log('\x1b[32m%s\x1b[0m' ,"Connection has been established successfully")
    } catch (error) {
        console.error("Unable to connect to the database", error)
    }

}

// root@localhost:3306

