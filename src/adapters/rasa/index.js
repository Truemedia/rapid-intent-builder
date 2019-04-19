const jsonfile = require('jsonfile');
const Adapter = require('./../adapter');
const Intent = require('./intent');
const Intents = require('./intents');

class RasaAdapter extends Adapter
{
  constructor()
  {
    super();
  }

  get intent()
  {
    return Intent;
  }

  toFiles(env, intents, invoke)
  {
    intents = new Intents(intents);

    let formatting = (env == 'dev') ? { spaces: 2, EOL: '\r\n' } : {};

    jsonfile.writeFile(intents.dest, intents.toJson(), formatting, function (err) {
      if (err) console.error(err)
      console.log(`intent file created (${intents.dest})`);
    });
  }
}

module.exports = RasaAdapter;
