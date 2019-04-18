module.exports = class Interaction {
    constructor(name, intents = [])
    {
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
};
