const DataObject = require('./../../data_object');

class Interaction extends DataObject
{
    constructor(name, intents = [])
    {
        super();
        this.name = name;
        this.intents = intents;
        this.types = []; // TODO: Make this dynamic
    }

    get languageModel()
    {
        return {
            invocationName: this.name,
            intents: this.intents.map(intent => intent.toJson()),
            types: this.types
        };
    }

    toJson()
    {
        return {
            interactionModel: {languageModel: this.languageModel}
        };
    }

    get dest() // TODO: Make contributing options configurable
    {
      let filename = this.filename();
      return filename;
    }

    get filenames()
    {
      return {
        json: 'interact'
      };
    }
};

module.exports = Interaction;
