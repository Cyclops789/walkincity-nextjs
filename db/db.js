require("dotenv").config();

const mysql = require("serverless-mysql");
const colors = require('colors');

const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
    }
});

async function executeQuery(query, values = []) {
    try {
        const results = await db.query(query, values);
        await db.end();
        return results;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    executeQuery,
    colors
}