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

(async () => {
    await executeQuery(`
        CREATE TABLE IF NOT EXISTS migrations (
            id INT(11) NOT NULL AUTO_INCREMENT,
            migration VARCHAR(255),
            PRIMARY KEY (id)
        );
    `);

    await executeQuery(`
        CREATE TABLE IF NOT EXISTS seeds (
            id INT(11) NOT NULL AUTO_INCREMENT,
            seed VARCHAR(255),
            PRIMARY KEY (id)
        );
    `);
})();

module.exports = {
    executeQuery,
    colors
}