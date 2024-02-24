const { executeQuery, colors } = require("../db");
colors.enable()

const table = 'countries'

const query = `
CREATE TABLE ${table} (
    id int(11) NOT NULL AUTO_INCREMENT,
    short_name varchar(50) NOT NULL,
    long_name varchar(100) NOT NULL,
    border_color varchar(255) NOT NULL,
    continent varchar(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY long_name (long_name),
    UNIQUE KEY short_name (short_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
`;

(async () => {
    await executeQuery(query, values = []).catch((e) => {
        console.log(`[${table}] Error creating the table: `.red, e);
        process.exit(0);
    });

    console.log(`[${table}] created with success!`.green);
})();