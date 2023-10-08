const ascap = require('./sources/ascap');
const utils = require('./utils/util');

async function init() {
    const data = await ascap.getFormattedData();

    await utils.writeFile('', data);

    process.exit();
}

init();