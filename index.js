const ascap = require('./sources/ascap');

async function init() {
    const data = await ascap.getFormattedData();

    process.exit();
}

init();