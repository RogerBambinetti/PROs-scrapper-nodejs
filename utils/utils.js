
async function addDelay(seconds = 2) {
    return new Promise((resolve) => setTimeout(resolve, 1000 * seconds));
}

async function writeFile() {
    const csv = await jsoncsv.json2csv(content.songs, {delimiter: {field: ';'}});

    fs.writeFileSync(`../logs/Sia ASCAP ${content.date}.csv`, csv);
    console.log('Wrote file to disk');
}

module.exports = { addDelay, writeFile };