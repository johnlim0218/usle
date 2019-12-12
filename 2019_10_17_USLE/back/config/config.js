const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    "development" : {
        "username" : "root",
        "password" : process.env.DB_PASSWORD,
        "database" : "usle_db",
        "host" : "127.0.0.1",
        "port" : "3306",
        "dialect" : "mysql",
        "timezone": "+09:00",
        "operatorsAliases": false
    },
    "test" : {
        "username" : "root",
        "password" : process.env.DB_PASSWORD,
        "database" : "usle_db",
        "host" : "127.0.0.1",
        "port" : "3306",
        "dialect" : "mysql",
        "timezone": "+09:00",
        "operatorsAliases": false
    },
    "production" : {
        "username" : "root",
        "password" : process.env.DB_PASSWORD,
        "database" : "usle_db",
        "host" : "127.0.0.1",
        "port" : "3306",
        "dialect" : "mysql",
        "timezone": "+09:00",
        "operatorsAliases": false
    }
}