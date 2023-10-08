const ascap = require('./sources/ascap');
const utils = require('./utils/util');

async function init() {
    const data = await ascap.getFormattedData();

    await utils.writeFile('log', data);

    process.exit();
}

init();