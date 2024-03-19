const { executeQuery, colors } = require("../db");
colors.enable()

const table = 'videos'

const query = `
CREATE TABLE ${table} (
    id int(11) NOT NULL AUTO_INCREMENT,
    vid varchar(255) NOT NULL,
    country varchar(255) NOT NULL,
    place varchar(255) NOT NULL,
    weather varchar(255) NOT NULL,
    type varchar(255) NOT NULL,
    created_on timestamp(6) NOT NULL DEFAULT current_timestamp(6),
    continent varchar(255) NOT NULL,
    seekTo int(11) NOT NULL DEFAULT 1,
    verified tinyint(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    UNIQUE KEY vid (vid)
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