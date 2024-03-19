const { executeQuery, colors } = require("../db");
colors.enable()

const table = 'countries'

const query = `
INSERT INTO ${table} (id, short_name, long_name, border_color, continent) VALUES
(1, 'FR', 'France', '#031935', 'Europe'),
(2, 'US', 'United States', '#640a1a', 'Americas'),
(3, 'ES', 'Spain', '#ebb019', 'Europe'),
(4, 'CN', 'China', '#ec1818', 'Asia'),
(5, 'IT', 'Italy', '#288e3c', 'Europe'),
(6, 'GB', 'United Kingdom', 'blue', 'Europe'),
(7, 'DE', 'Germany', 'black', 'Europe'),
(8, 'MX', 'Mexico', 'green', 'Americas'),
(9, 'TH', 'Thailand', 'red', 'Asia'),
(10, 'TR', 'Turkey', 'red', 'Europe'),
(11, 'AT', 'Austria', 'red', 'Europe'),
(12, 'MY', 'Malaysia', 'blue', 'Asia'),
(13, 'HK', 'Hong Kong', 'red', 'Asia'),
(14, 'GR', 'Greece', 'blue', 'Europe'),
(15, 'RU', 'Russia', 'red', 'Asia'),
(16, 'JP', 'Japan', 'red', 'Asia'),
(17, 'CA', 'Canada', 'red', 'Americas'),
(18, 'SA', 'Saudi Arabia', 'green', 'Asia'),
(19, 'PL', 'Poland', 'red', 'Europe'),
(20, 'KR', 'South Korea', 'blue', 'Asia'),
(21, 'NL', 'Netherlands', 'blue', 'Europe'),
(22, 'HU', 'Hungary', 'green', 'Europe'),
(23, 'AE', 'United Arab Emirates', 'black', 'Asia'),
(24, 'IN', 'India', 'brown', 'Asia'),
(25, 'HR', 'Croatia', 'blue', 'Europe'),
(26, 'SG', 'Singapore', 'red', 'Asia'),
(27, 'ID', 'Indonesia', 'red', 'Asia'),
(28, 'CZ', 'Czech Republic', 'blue', 'Europe'),
(29, 'MA', 'Morocco', 'red', 'Africa');
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