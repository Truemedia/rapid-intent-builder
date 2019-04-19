const Intents = require('./../../intents');

class RasaIntents extends Intents
{
  constructor(intents)
  {
      super(intents);
  }

  toJson()
  {
    let {rasa_nlu_data} = this;
    return {rasa_nlu_data};
  }

  get rasa_nlu_data()
  {
    let {common_examples, regex_features, lookup_tables, entity_synonyms} = this;
    return {common_examples, regex_features, lookup_tables, entity_synonyms};
  }

  get common_examples()
  {
    return [].concat(...this.intents.map(
      intent => intent.toJson()
    ));
  }

  get regex_features()
  {
    return []; // TODO: Flesh out
  }

  get lookup_tables()
  {
    return []; // TODO: Flesh out
  }

  get entity_synonyms()
  {
    return []; // TODO: Flesh out
  }

  get dest() // TODO: Make contributing options configurable
  {
    let filename = this.filename();
    return `nlu_data/${filename}`;
  }

  get filenames()
  {
    return {
      json: 'training_data'
    };
  }
}

module.exports = RasaIntents;
