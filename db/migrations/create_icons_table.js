const { executeQuery, colors } = require("../db");
colors.enable()

const table = 'icons'

const query = `
CREATE TABLE ${table} (
    id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    time varchar(255) NOT NULL,
    old varchar(255) NOT NULL,
    new varchar(255) NOT NULL,
    created_on timestamp(6) NOT NULL DEFAULT current_timestamp(6),
    PRIMARY KEY (id)
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