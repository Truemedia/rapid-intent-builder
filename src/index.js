const verboseUtterance = require('verbose-utterance');
const path = require('path');
const yargs = require('yargs')
    .usage("$0 --f=sample.utter")
    .option('file', {
        alias: 'f',
        default: './node_modules/verbose-utterance/samples/greeting.utter',
        describe: 'Filename of utterance file',
        type: 'string'
    })
    .help('h')
    .alias('h', 'help');

if (yargs.argv.h) {
    yargs.showHelp();
}

let filename = yargs.argv.f
verboseUtterance(filename).then( (utterances) => {
    let intentName = path.basename(filename, path.extname(filename));
    let keywords = []; // TODO: Populate this with slots

    let intent = {intentName, utterances, keywords};
    console.log(intent);
});
