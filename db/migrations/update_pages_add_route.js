const { executeQuery, colors } = require("../db");
colors.enable()

const table = 'pages'
const column = 'route'

const query = `
ALTER TABLE ${table} ADD ${column} VARCHAR(255) NOT NULL;
`;

async function execute()  {
    await executeQuery(query, values = []).catch((e) => {
        console.log(`[${table} - ${column}] Error adding the column to table: `.red, e);
    });

    console.log(`[${table} - ${column}] added with success!`.green);
};

module.exports = {
    execute
};