require("dotenv").config();
const mysqldump = require('mysqldump')

function getCurrentDateTime() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');

    const dateTimeString = `${year}-${month}-${day}_${hour}:${minute}:${second}`;

    return dateTimeString;
}

mysqldump({
    connection: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
    },
    dumpToFile: __dirname+`/../backups/${getCurrentDateTime()}.sql`,
});