const jsonfile = require('jsonfile');
const Adapter = require('./../adapter');
const Interaction = require('./interaction');
const Intent = require('./../../intent');

class AlexaAdapter extends Adapter
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
    let interact = new Interaction(invoke, intents);

    let formatting = (env == 'dev') ? { spaces: 2, EOL: '\r\n' } : {};

    jsonfile.writeFile(interact.dest, interact.toJson(), formatting, function (err) {
      if (err) console.error(err)
      console.log(`interact file created (${interact.dest})`);
    });
  }
}

module.exports = AlexaAdapter;
