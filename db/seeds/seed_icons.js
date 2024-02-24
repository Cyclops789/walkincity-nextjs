const { executeQuery, colors } = require("../db");
colors.enable()

const table = 'icons'

const query = `
INSERT INTO ${table} (id, name, time, old, new, created_on) VALUES
(1, 'rain', 'morning', 'weather-rain-morning', 'fa-solid fa-cloud-sun-rain', '2023-07-10 15:25:16.393135'),
(2, 'rain', 'night', 'weather-rain-night', 'fa-solid fa-cloud-moon-rain', '2023-07-10 15:25:16.397577'),
(3, 'cloud', 'morning', 'weather-cloud-morning', 'fa-solid fa-cloud', '2023-07-10 15:25:16.402166'),
(4, 'cloud', 'night', 'weather-cloud-night', 'fa-solid fa-cloud', '2023-07-10 15:25:16.408602'),
(5, 'snow', 'morning', 'weather-snow-morning', 'fa-regular fa-snowflake', '2023-07-10 15:25:16.415845'),
(6, 'snow', 'night', 'weather-snow-night', 'fa-solid fa-cloud-meatball', '2023-07-10 15:25:16.423373'),
(7, 'normal', 'morning', 'weather-normal-morning', 'fa-solid fa-sun', '2023-07-10 15:25:16.429579'),
(8, 'normal', 'night', 'weather-normal-night', 'fa-solid fa-moon', '2023-07-10 15:25:16.433944');
`;

(async () => {
    await executeQuery(query, values = []).catch((e) => {
        console.log(`[${table}] Error seeding the table: `.red, e);
        process.exit(0);
    });

    console.log(`[${table}] seeded with success!`.green);
})();