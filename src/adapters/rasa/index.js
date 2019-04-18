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

  get intents()
  {
    return Intents;
  }
}

module.exports = RasaAdapter;
