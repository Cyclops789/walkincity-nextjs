const { executeQuery, colors } = require("../db");
colors.enable()

const table = 'users'

const query = `
CREATE TABLE ${table} (
    id int(11) NOT NULL AUTO_INCREMENT,
    username varchar(50) NOT NULL,
    email varchar(100) NOT NULL,
    password varchar(255) NOT NULL,
    created_at timestamp NULL DEFAULT current_timestamp(),
    role int(11) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY email (email),
    UNIQUE KEY username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
`;

(async () => {
    await executeQuery(query, values = []).catch((e) => {
        console.log(`[${table}] Error creating the table: `.red, e);
        process.exit(0);
    });

    console.log(`[${table}] created with success!`.green);
})();