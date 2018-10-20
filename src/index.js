const glob = require('glob-fs')({ gitignore: true });
const jsonfile = require('jsonfile');
const path = require('path');
const verboseUtterance = require('verbose-utterance');
const yargs = require('yargs')
    .usage("$0 --f=sample.utter --e=molir")
    .option('utters', {
        alias: 'u',
        default: 'samples/en_GB/*.utter',
        describe: 'Glob to match utter files',
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

let utterPath = yargs.argv.u;
let adapter = yargs.argv.a;


glob.readdirPromise(utterPath)
  .then(files => {
    return Promise.all(files.map( filename => {
      return verboseUtterance(filename).then( (utterances) => {
          let intentName = path.basename(filename, path.extname(filename));
          let keywords = []; // TODO: Populate this with slots

          let intent = null;
          switch (adapter) {
              case 'molir':
                  intent = new MolirIntent(intentName, utterances, keywords);
              break;
              default:
                  intent = new Intent(intentName, utterances, keywords);
              break;
          }


        return intent;
      });
    })).then(intents => {
      switch (adapter) {
          case 'molir':
              console.log('Exporting using adapter: molir');
              intents = new Intents(intents);
          break;
          default:
              console.log('Exporting using adapter: alexa');
              let skillName = 'skillName'; // TODO: Add option
              intents = new Interaction(skillName, intents);
          break;
      }

      let intentFile = 'intents.json'; // TODO: Make option
      jsonfile.writeFile(intentFile, intents.toJson(), { spaces: 2, EOL: '\r\n' }, function (err) {
        if (err) console.error(err)
        console.log(`intent file created (${intentFile})`);
      });
    });
  });
