const puppeteer = require('puppeteer');
const utils = require('../utils/util');

const url = "https://www.ascap.com/repertory#/ace/search/writer/FURLER%20SIA%20KATE%20I";

async function getData() {
    try {
        return [];
    } catch (e) {
        console.log('An error occurred', e);
    }
}

async function getFormattedData() {
    const data = await getData();

    return data.map(d => {

        return { workId: d.shIPI, title: d.shName, creators: "", source: 'SOCAN' }
    });
}

module.exports = { getFormattedData };