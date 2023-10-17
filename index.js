const fs = require('fs');
const path = require('path');
const utils = require('./utils/util');

async function init() {

    const currentDate = new Date();
    const formattedDate = currentDate.getFullYear() + '.' + (currentDate.getMonth() + 1) + '.' + currentDate.getDate();

    console.log('Init', formattedDate);

    const sources = fs.readdirSync('./sources');

    for (const source of sources) {
        const moduleName = `${path.basename(source, '.js')}`;
        const module = require(`./sources/${source}`);

        const csv = fs.readFileSync(`./logs/${moduleName}.csv`);

        const data = await module.getFormattedData();

        for (const d of data) {
            if (!csv.toString().includes(d.workId)) {
                console.log('New record', d);
            }
        }

        await utils.writeFile(moduleName, data)
    };

    process.exit();
}

init();