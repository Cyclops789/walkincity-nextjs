const { executeQuery, colors } = require("../db");
colors.enable()

const table = 'continents'

const query = `
INSERT INTO ${table} (id, continent_name, continent_icon, continent_color) VALUES
    (1, 'Africa', 'africa', 'brown'),
    (2, 'Asia', 'asia', 'yellow'),
    (3, 'Europe', 'europe', 'green'),
    (4, 'Americas', 'americas', 'blue'),
    (6, 'Oceania', 'oceania', 'brown'),
    (7, 'Antarctica', 'antarctica', 'grey');
`;

(async () => {
    await executeQuery(query, values = []).catch((e) => {
        console.log(`[${table}] Error seeding the table: `.red, e);
        process.exit(0);
    });

    console.log(`[${table}] seeded with success!`.green);
})();