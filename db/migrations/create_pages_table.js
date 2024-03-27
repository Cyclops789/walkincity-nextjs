const { executeQuery, colors } = require("../db");
colors.enable()

const table = 'pages'

const query = `
CREATE TABLE ${table} (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT DEFAULT NULL,
    name varchar(255) NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY name (name)
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