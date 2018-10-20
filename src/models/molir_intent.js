const Intent = require('./intent');

module.exports = class MolirIntent extends Intent {
    toJson()
    {
        return {
            intentName: this.name,
            utterences: this.samples,
            keywords: this.slots
        };
    }
};
