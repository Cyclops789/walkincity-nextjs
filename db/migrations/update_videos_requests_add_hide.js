const { executeQuery, colors } = require("../db");
colors.enable()

const table = 'videos_requests'
const column = 'action'

const query = `
ALTER TABLE ${table} ADD ${column} BOOLEAN DEFAULT NULL;
`;

(async () => {
    await executeQuery(query, values = []).catch((e) => {
        console.log(`[${table} - ${column}] Error adding the column the table: `.red, e);
        process.exit(0);
    });

    console.log(`[${table} - ${column}] added with success!`.green);
})();