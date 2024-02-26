const { executeQuery, colors } = require("../db");
colors.enable()

const table = 'tokens'

const query = `
CREATE TABLE ${table} (
    id int(11) NOT NULL AUTO_INCREMENT,
    token varchar(255) NOT NULL,
    created_at timestamp NULL DEFAULT current_timestamp(),
    PRIMARY KEY (id),
    UNIQUE KEY (token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
`;

async function execute()  {
    await executeQuery(query, values = []).catch((e) => {
        console.log(`[${table}] Error creating the table: `.red, e);
    });

    console.log(`[${table}] created with success!`.green);
};

module.exports = {
    execute
}