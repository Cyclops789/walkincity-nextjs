const { executeQuery, colors } = require("./db");
colors.enable();

(async () => {
    try {
        await executeQuery(`
            CREATE TABLE IF NOT EXISTS migrations (
                id INT(11) NOT NULL AUTO_INCREMENT,
                migration VARCHAR(255),
                PRIMARY KEY (id)
            );
        `);

        await executeQuery(`
            CREATE TABLE IF NOT EXISTS seeds (
                id INT(11) NOT NULL AUTO_INCREMENT,
                seed VARCHAR(255),
                PRIMARY KEY (id)
            );
        `);

        console.log(`[OK] initial tables has been created!`.green);
    } catch (err) {
        console.error('Error:'.red, err);
    } finally {
        process.exit(0);
    }
})();