const { executeQuery, colors } = require("../db");
colors.enable()

const table = 'videos_bugs'
const column = 'action'

const query = `
ALTER TABLE ${table} ADD ${column} VARCHAR(255) DEFAULT NULL;
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