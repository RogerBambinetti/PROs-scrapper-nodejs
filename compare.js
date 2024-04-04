const util = require('./utils/util');

async function init(){
    const komca = await util.readFile('./logs/komca.csv');
    const ascap = await util.readFile('./logs/ascap.csv');

    const string = JSON.stringify(ascap);

    komca.map(k => {
        if(!string.includes(k.title)){
            console.log(k.title)
        }
    })
}

init()

