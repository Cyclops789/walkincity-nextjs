const { executeQuery, colors } = require("../db");
colors.enable()

const table = 'videos_bugs'

const query = `
INSERT INTO ${table} (vid, reason, action) VALUES
(NULL, 'Button not working', ''),
('LPgZ4lKfBPw', 'Video not working', ''),
(NULL, 'Reaction not working', ''),
(NULL, 'Website not working', ''),
(NULL, 'Something not working', ''),
(NULL, 'Button not working', '');
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