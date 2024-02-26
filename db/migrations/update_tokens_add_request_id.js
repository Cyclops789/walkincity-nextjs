const { executeQuery, colors } = require("../db");
colors.enable()

const table = 'tokens'
const column = 'videoId'

const query = `
ALTER TABLE ${table} ADD ${column} INT(11) NOT NULL;
`;

async function execute()  {
    await executeQuery(query, values = []).catch((e) => {
        console.log(`[${table} - ${column}] Error adding the column to table: `.red, e);
    });

    console.log(`[${table} - ${column}] added with success!`.green);
};

module.exports = {
    execute
}