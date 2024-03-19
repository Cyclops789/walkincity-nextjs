const { executeQuery, colors } = require("../db");
colors.enable()

const table = 'videos_requests'
const column = 'verified'

const query = `
ALTER TABLE ${table} ADD ${column} BOOLEAN NOT NULL DEFAULT 0;
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