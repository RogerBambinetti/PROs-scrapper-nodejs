const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const utils = require('./utils/util');

async function init() {

    const currentDate = new Date();
    const formattedDate = currentDate.getFullYear() + '.' + (currentDate.getMonth() + 1) + '.' + currentDate.getDate();

    const sources = fs.readdirSync('./sources');

    for (const source of sources) {
        const moduleName = `${path.basename(source, '.js')}`;
        const module = require(`./sources/${source}`);

        const csv = fs.readFileSync(`./logs/${moduleName}.csv`);

        const oldData = parse(csv, { columns: true, delimiter: ';' });
        console.log('---------------- STARTING SOURCE', source.toUpperCase(), '----------------');
        const data = await module.getFormattedData();

        for (const d of data) {
            if (!csv.toString().includes(d.workId)) {
                d.date = formattedDate;
                oldData.push(d);
                console.log('New record', d);
            }
        }

        await utils.writeFile(moduleName, oldData)
    };

    process.exit();
}

init();