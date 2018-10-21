#! /usr/bin/env node
const glob = require('glob-promise');
const jsonfile = require('jsonfile');
const path = require('path');
const verboseUtterance = require('verbose-utterance');
const options = require('./options.json');

const yargs = require('yargs')
    .usage("$0 --f=sample.utter --e=molir")
    .option('adapter', options.adapter)
    .option('dest', options.dest)
    .option('lexes', options.lexes)
    .option('utters', options.utters)
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

// Set options from cli arguments
let adapter = yargs.argv.a;
let dest = yargs.argv.d;
let utterPath = yargs.argv.u;
let lexPath = yargs.argv.l;

Promise.all([ // Get list of all files
  glob(utterPath),
  glob(lexPath)
]).then(filePaths => { // Group files
  let intents = {};
  filePaths.map(files => {
    files.map(file => {
      let base = path.basename(file);
      let [name, ext] = base.split('.');
      if (intents[name] == undefined) {
        intents[name] = {};
      }
      intents[name][ext] = file;
    });
  });
  return intents;
}).then(intents => { // Build intents
  return Promise.all( Object.entries(intents).map(intent => {
    let [name, opts] = intent;
    return jsonfile.readFile(opts.json)
      .then(lex => {
        return verboseUtterance(opts.utter, lex);
      }).then(utterances => {
        let keywords = []; // TODO: Populate this with slots
        switch (adapter) {
          case 'molir':
            intent = new MolirIntent(name, utterances, keywords);
          break;
          default:
            intent = new Intent(name, utterances, keywords);
          break;
        }
        return intent;
      });
  }));
}).then(intents => { // Group intents and output
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

  jsonfile.writeFile(dest, intents.toJson(), { spaces: 2, EOL: '\r\n' }, function (err) {
    if (err) console.error(err)
    console.log(`intent file created (${dest})`);
  });
});
