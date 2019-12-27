const dotenv = require('dotenv');
dotenv.config();

const username = "root";
const host = "127.0.0.1";
const port = "3307";
const dialect = "mariadb"

module.exports = {
    "development" : {
        "username" : username,
        "password" : process.env.DB_PASSWORD,
        "database" : "usle_db",
        "host" : host,
        "port" : port,
        "dialect" : dialect,
        "timezone": "+09:00",
        "operatorsAliases": false
    },
    "test" : {
        "username" : username,
        "password" : process.env.DB_PASSWORD,
        "database" : "usle_db",
        "host" : host,
        "port" : port,
        "dialect" : dialect,
        "timezone": "+09:00",
        "operatorsAliases": false
    },
    "production" : {
        "username" : username,
        "password" : process.env.DB_PASSWORD,
        "database" : "usle_db",
        "host" : host,
        "port" : port,
        "dialect" : dialect,
        "timezone": "+09:00",
        "operatorsAliases": false
    }
}