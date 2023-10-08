
async function addDelay(seconds = 2) {
    return new Promise((resolve) => setTimeout(resolve, 1000 * seconds));
}

module.exports = { addDelay };