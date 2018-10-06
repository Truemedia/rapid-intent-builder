const Intent = require('./intent');

module.exports = class MolirIntent extends Intent {
    toJson()
    {
        return {
            intentName: this.name,
            uttterances: this.samples,
            keywords: this.slots
        };
    }
};
