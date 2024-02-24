const { executeQuery, colors } = require("../db");
colors.enable()

const table = 'roles'

const query = `
CREATE TABLE ${table} (
    id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    permissions longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(permissions)),
    PRIMARY KEY (id),
    UNIQUE KEY (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
`;

(async () => {
    await executeQuery(query, values = []).catch((e) => {
        console.log(`[${table}] Error creating the table: `.red, e);
        process.exit(0);
    });

    console.log(`[${table}] created with success!`.green);
})();