const jsonfile = require('jsonfile');
const path = require('path');
const verboseUtterance = require('verbose-utterance');
const yargs = require('yargs')
    .usage("$0 --f=sample.utter --e=molir")
    .option('file', {
        alias: 'f',
        default: './node_modules/verbose-utterance/samples/greeting.utter',
        describe: 'Filename of utterance file',
        type: 'string'
    })
    .option('export', {
        alias: 'e',
        default: 'molir',
        describe: 'Name of system to export to (alexa, molir)',
        type: 'string'
    })
    .help('h')
    .alias('h', 'help');

const MolirIntent = require('./models/molir_intent');
const Intent = require('./models/intent');

if (yargs.argv.h) {
    yargs.showHelp();
}

let filename = yargs.argv.f;
let botSystem = yargs.argv.e;


verboseUtterance(filename).then( (utterances) => {
    let intentName = path.basename(filename, path.extname(filename));
    let keywords = []; // TODO: Populate this with slots

    let intent = null;
    switch (botSystem) {
        case 'molir':
            intent = new MolirIntent(intentName, utterances, keywords);
        break;
        default:
            intent = new Intent(intentName, utterances, keywords);
        break;
    }

    let intentFile = `${intentName}.json`;
    jsonfile.writeFile(intentFile, [intent.toJson()], function (err) {
      if (err) console.error(err)
      console.log(`intent file created (${intentFile})`);
    });
});
