const Intent = require('./../../intent');

module.exports = class MolirIntent extends Intent {
    toJson()
    {
        return {
            intentName: this.name,
            utterances: this.samples,
            keywords: this.slots
        };
    }
};
