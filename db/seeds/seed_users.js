const { executeQuery, colors } = require("../db");
colors.enable()

const table = 'users'

const query = `
INSERT INTO ${table} (id, username, email, password, created_at, role) VALUES
(2, 'hamza', 'hamza@cyyc.lol', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '2024-01-29 11:53:06', 1);
`;

async function execute()  {
    await executeQuery(query, values = []).catch((e) => {
        console.log(`[${table}] Error seeding the table: `.red, e);
    });

    console.log(`[${table}] seeded with success!`.green);
};

module.exports = {
    execute
}