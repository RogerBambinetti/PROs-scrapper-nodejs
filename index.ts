const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const utils = require('./utils/util');

async function init() {

    const currentDate = new Date();
    const formattedDate = currentDate.getFullYear() + '.' + (currentDate.getMonth() + 1) + '.' + currentDate.getDate();

    const sources = fs.readdirSync('./sources');

    for (const source of sources) {
        try {
            const moduleName = `${path.basename(source, '.ts')}`;
            const { default: Module } = require(`./sources/${source}`);

            const module = new Module();

            const csv = fs.readFileSync(`./logs/${moduleName}.csv`);
            const oldData = parse(csv, { columns: true, delimiter: ';' });

            console.log('---------------- STARTING SOURCE', moduleName.toUpperCase(), '----------------');
            const data = await module.getFormattedData();

            for (const d of data) {
                if (!csv.toString().includes(d.workId)) {
                    d.date = formattedDate;
                    oldData.push(d);
                    console.log('New record', d);
                }
            }

            await utils.writeFile(moduleName, oldData)
        } catch (err) {
            console.log('ERROR', err)
        }
    };

    process.exit();
}

init();