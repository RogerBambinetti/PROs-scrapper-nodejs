const fs = require('fs');
const jsoncsv = require('json-2-csv');

async function addDelay(seconds = 2) {
    return new Promise((resolve) => setTimeout(resolve, 1000 * seconds));
}

async function readFile(path){
    const data = fs.readFileSync(path, {encoding: 'utf-8'});

    const json = await jsoncsv.csv2json(data, {delimiter: {field: ';'}});

    return json;
}

async function writeFile(title, data) {
    const csv = await jsoncsv.json2csv(data, {delimiter: {field: ';'}});

    fs.writeFileSync(`./logs/${title}.csv`, csv);
    console.log('Wrote file to disk');
}

module.exports = { addDelay, readFile, writeFile };