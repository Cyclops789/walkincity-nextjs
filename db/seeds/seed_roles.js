const { executeQuery, colors } = require("../db");
colors.enable()

const table = 'roles'

const query = `
INSERT INTO ${table} (name, permissions, id) VALUES
('Super Admin', '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]', 1),
('Admin', '[1,2,3,4,5,10,11,12,13]', 2),
('Videos verifier', '[1,5]', 3);
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