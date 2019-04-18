#! /usr/bin/env node
const glob = require('glob-promise');
const jsonfile = require('jsonfile');
const path = require('path');
const verboseUtterance = require('verbose-utterance');
const {Lexicon, Lexeme} = require('lemme-lex');
const options = require('./options.json');
const adapters = require('./adapters');

const yargs = require('yargs')
    .usage("$0 --f=sample.utter --e=molir")
    .option('adapter', options.adapter)
    .option('dest', options.dest)
    .option('env', options.env)
    .option('invoke', options.invoke)
    .option('lexes', options.lexes)
    .option('slots', options.slots)
    .option('utters', options.utters)
    .help('h')
    .alias('h', 'help');

/**
  * Adapters
  */
// Molir
const MolirIntent = require('./adapters/molir/intent');
const Intents = require('./intents');
// Alexa
const Intent = require('./intent');
const Interaction = require('./adapters/alexa/interaction');

if (yargs.argv.h) { yargs.showHelp(); }

// Set options from cli arguments
let adapter = yargs.argv.a;
let dest = yargs.argv.d;
let env = yargs.argv.e;
let invoke = yargs.argv.i;
let lexPath = yargs.argv.l;
let slotPath = yargs.argv.s;
let utterPath = yargs.argv.u;

/**
  * Promises for file types
  */
function lex(files)
{
    return (files.txt != undefined) ? Lexicon.fromFile(files.txt) : Promise.resolve(null);
}

let adapterInstance = new adapters[adapter];

Promise.all([ // Get list of all files
  glob(utterPath),
  glob(lexPath),
  glob(slotPath)
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
    let [name, files] = intent;
    return lex(files)
      .then(lex => {
        let tagTree = (lex != null) ? lex.byTags : null;
        return verboseUtterance(files.utter, tagTree);
      }).then(utterances => {
        let keywords = []; // TODO: Populate this with slots
        let intent = new adapterInstance.intent(name, utterances, keywords);
        return intent;
      });
  }));
}).then(intents => { // Group intents and output
  console.log(`Exporting using adapter: ${adapter}`);
  intents = new adapterInstance.intents(intents);;

  let formatting = (env == 'dev') ? { spaces: 2, EOL: '\r\n' } : {};

  jsonfile.writeFile(intents.dest, intents.toJson(), formatting, function (err) {
    if (err) console.error(err)
    console.log(`intent file created (${intents.dest})`);
  });
});
