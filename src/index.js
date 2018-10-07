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
    .option('adapter', {
        alias: 'a',
        default: 'molir',
        describe: 'Name of adapter to use for export (alexa, molir)',
        type: 'string'
    })
    .help('h')
    .alias('h', 'help');

/**
  * Adapters
  */
// Molir
const MolirIntent = require('./models/molir_intent');
const Intents = require('./models/intents');
// Alexa
const Intent = require('./models/intent');
const Interaction = require('./models/interaction');

if (yargs.argv.h) {
    yargs.showHelp();
}

let filename = yargs.argv.f;
let adapter = yargs.argv.a;



verboseUtterance(filename).then( (utterances) => {
    let intentName = path.basename(filename, path.extname(filename));
    let keywords = []; // TODO: Populate this with slots

    let intent = null;
    let intents = null;
    switch (adapter) {
        case 'molir':
            console.log('Exporting using adapter: molir');
            intent = new MolirIntent(intentName, utterances, keywords);
            intents = new Intents([intent.toJson()]);
        break;
        default:
            console.log('Exporting using adapter: alexa');
            intent = new Intent(intentName, utterances, keywords);
            intents = new Interaction(intentName, [intent.toJson()]);
            console.log('intents', intents);
        break;
    }

    let intentFile = `${intentName}.json`;
    jsonfile.writeFile(intentFile, intents.toJson(), function (err) {
      if (err) console.error(err)
      console.log(`intent file created (${intentFile})`);
    });
});
