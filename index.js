const fs = require('fs');
const path = require('path');
const utils = require('./utils/util');

async function init() {

    const currentDate = new Date();
    const formattedDate = currentDate.getFullYear() + '.' + (currentDate.getMonth() + 1) + '.' + currentDate.getDate();

    const sources = fs.readdirSync('./sources');

    let totalData = [];

    for (const source of sources) {
        const module = require(`./sources/${source}`);

        const data = await module.getFormattedData();

        totalData = totalData.concat(data);
    };

    await utils.writeFile(`log ${formattedDate}`, totalData)

    process.exit();
}

init();