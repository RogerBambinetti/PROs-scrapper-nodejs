const fs = require('fs');
const jsoncsv = require('json-2-csv');

async function addDelay(seconds = 2) {
    return new Promise((resolve) => setTimeout(resolve, 1000 * seconds));
}

async function writeFile(title, data) {
    const csv = await jsoncsv.json2csv(data, {delimiter: {field: ';'}});

    fs.writeFileSync(`./logs/log.csv`, csv);
    console.log('Wrote file to disk');
}

module.exports = { addDelay, writeFile };