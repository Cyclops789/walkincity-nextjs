const { executeQuery, colors } = require("../db");
colors.enable()

const table = 'videos'
const column = 'endsat'

const query = `
ALTER TABLE ${table} ADD ${column} INT(11) DEFAULT 0;
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