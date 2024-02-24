const { executeQuery, colors } = require("../db");
colors.enable()

const table = 'radios'

const query = `
CREATE TABLE ${table} (
    id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    url varchar(255) NOT NULL,
    created_on timestamp(6) NOT NULL DEFAULT current_timestamp(6),
    PRIMARY KEY (id),
    UNIQUE KEY name (name),
    UNIQUE KEY url (url)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
`;

(async () => {
    await executeQuery(query, values = []).catch((e) => {
        console.log(`[${table}] Error creating the table: `.red, e);
        process.exit(0);
    });

    console.log(`[${table}] created with success!`.green);
})();