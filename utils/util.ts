import fs from 'fs';
import { json2csv, csv2json } from 'json-2-csv';

async function addDelay(seconds = 2) {
    return new Promise((resolve) => setTimeout(resolve, 1000 * seconds));
}

async function readFile(path: string) {
    const data = fs.readFileSync(path, { encoding: 'utf-8' });

    const json = await csv2json(data, { delimiter: { field: ';' } });

    return json;
}

async function writeFile(title: string, data: Array<object>) {
    const csv = await json2csv(data, { delimiter: { field: ';' } });

    fs.writeFileSync(`./logs/${title}.csv`, csv);
    console.log('Wrote file to disk');
}

export default { addDelay, readFile, writeFile };