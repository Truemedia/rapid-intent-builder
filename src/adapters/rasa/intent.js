const Intent = require('./../../intent');

class RasaIntent extends Intent
{
  constructor(name, samples, slots)
  {
    super(name, samples, slots);
  }

  toJson()
  {
    return this.samples.map(sample => {
      return {intent: this.name, text: sample}
    });
  }
}

module.exports = RasaIntent;
