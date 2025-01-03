import { configDotenv } from "dotenv";

import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import util from "./utils/util";

async function init() {

    configDotenv();

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}.${currentDate.getMonth() + 1}.${currentDate.getDate()}`;

    const sources = fs.readdirSync('./sources').filter(source => source.includes('.ts'));

    for (const source of sources) {
        try {
            const moduleName = `${path.basename(source, '.ts')}`;
            const { default: Module } = require(`./sources/${source}`);

            const module = new Module();

            console.log('---------------- STARTING SOURCE', moduleName.toUpperCase(), '----------------');

            const data = await module.getFormattedData();

            const logAlreadyExists = fs.existsSync(`./logs/${moduleName}.csv`);
            let oldData = data;
            let newDataAdded = false;

            if (logAlreadyExists) {
                const csv = fs.readFileSync(`./logs/${moduleName}.csv`);
                oldData = parse(csv, { columns: true, delimiter: ';' });

                for (const d of data) {
                    if (!csv.toString().includes(d.workId)) {
                        d.date = formattedDate;
                        oldData.push(d);
                        newDataAdded = true;
                        console.log('New record', d);
                    }
                }
            }

            if (newDataAdded || !logAlreadyExists) {
                await util.writeFile(moduleName, oldData);
            }
        } catch (err) {
            console.log('ERROR', err)
        }
    };

    process.exit();
}

init();