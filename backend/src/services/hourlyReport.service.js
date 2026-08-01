const { parseInbound } = require("../parsers/inbound.parser");
const { parseGoogle } = require("../parsers/google.parser");
const { parseFacebook } = require("../parsers/facebook.parser");
const { parseForms } = require("../parsers/forms.parser");

async function buildHourlyReport({ inbound, google, facebook, forms, fecha }) {

    return [];

}

module.exports = {
    buildHourlyReport
};