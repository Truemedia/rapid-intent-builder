const Intents = require('./../../intents');

class RasaIntents extends Intents
{
  constructor(intents)
  {
      super(intents);
  }

  toJson()
  {
    return {
      "rasa_nlu_data": {
        "common_examples": ...this.intents,
        "regex_features" : [],
        "lookup_tables"  : [],
        "entity_synonyms": []
      }
    };
  }
}

module.exports = RasaIntents;
