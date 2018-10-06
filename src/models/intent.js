const DataObject = require('./data_object');

module.exports = class Intent extends DataObject {
    constructor(name, samples, slots = [])
    {
        super();
        this.name = name;
        this.samples = samples;
        this.slots = slots;
    }
};
