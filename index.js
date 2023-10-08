const ascap = require('./sources/ascap');
const utils = require('./utils/util');

async function init() {
    const data = await ascap.getFormattedData();

    const currentDate = new Date();
    const formattedDate = currentDate.getFullYear() + '.' + (currentDate.getMonth() + 1) + '.' + currentDate.getDate();

    await utils.writeFile(`${formattedDate}`, data);

    process.exit();
}

init();