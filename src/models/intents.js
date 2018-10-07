const DataObject = require('./data_object');

module.exports = class Intents extends DataObject
{
    constructor(intents)
    {
        super();
        this.intents = intents;
    }
};
