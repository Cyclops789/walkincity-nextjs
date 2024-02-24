const fs = require('fs');
const path = require('path');
const directoryPath = __dirname + '/../seeds';
const { executeQuery } = require("../db");

(async () => {
    try {
        const files = await fs.promises.readdir(directoryPath);

        let seeds;
        const seedsQueryPromise = executeQuery(`SELECT * FROM seeds;`);

        const result = await seedsQueryPromise;
        seeds = JSON.stringify(result);
        
        const seedsAsJSON = JSON.parse(seeds);

        for (const file of files) {
            if (file.endsWith('.js')) {
                let alreadySeeded = false;

                for (const seed of seedsAsJSON) {
                    if (seed.seed === file.replace('.js', '')) {
                        alreadySeeded = true;
                        break;
                    }
                }

                if (!alreadySeeded) {
                    await executeQuery(
                        `INSERT INTO seeds (seed) VALUES (?);`,
                        [file.replace('.js', '')]
                    );

                    const filePath = path.join(directoryPath, file);
                    require(filePath);
                }
            }
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        process.exit(0);
    }
})();
