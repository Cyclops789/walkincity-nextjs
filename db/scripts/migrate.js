const fs = require('fs');
const path = require('path');
const directoryPath = __dirname + '/../migrations';
const { executeQuery } = require("../db");

(async () => {
    try {
        const files = await fs.promises.readdir(directoryPath);

        let migrations;
        const migrationsQueryPromise = executeQuery(`SELECT * FROM migrations;`);

        const result = await migrationsQueryPromise;
        migrations = JSON.stringify(result);
        
        const migrationsAsJSON = JSON.parse(migrations);

        for (const file of files) {
            if (file.endsWith('.js')) {
                let alreadyMigrated = false;

                for (const migration of migrationsAsJSON) {
                    if (migration.migration === file.replace('.js', '')) {
                        alreadyMigrated = true;
                        break;
                    }
                }

                if (!alreadyMigrated) {
                    const filePath = path.join(directoryPath, file);
                    require(filePath).execute();

                    await executeQuery(
                        `INSERT INTO migrations (migration) VALUES (?);`,
                        [file.replace('.js', '')]
                    );
                }
            }
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        process.exit(0);
    }
})();
