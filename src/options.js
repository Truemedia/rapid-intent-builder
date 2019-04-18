module.exports = function() {
  let adapters = ['rasa']; // Currently functional
  let adapterList = adapters.join(', ');

  return {
    "adapter": {
      "alias": "a",
      "default": "rasa",
      "describe": `Name of adapter to use for export (${adapterList})`,
      "type": "string"
    },
    // "dest": {
    //   "alias": "d",
    //   "default": "build/intents.json",
    //   "describe": "Destination of the generated intents file (path)",
    //   "type": "string"
    // },
    "env": {
      "alias": "e",
      "default": "dev",
      "describe": "Environment (dev or prod)",
      "type": "string"
    },
    // "invoke": {
    //   "alias": "i",
    //   "default": "my skill",
    //   "describe": "Phrase used to invoke skill (alexa only)",
    //   "type": "string"
    // },
    "lexes": {
      "alias": "l",
      "default": "samples/en_GB/*.txt",
      "describe": "Glob to match lexicon files (.txt)",
      "type": "string"
    },
    "slots": {
      "alias": "s",
      "default": "samples/en_GB/*.json",
      "describe": "Glob to match slot files (.json)",
      "type": "string"
    },
    "utters": {
      "alias": "u",
      "default": "samples/en_GB/*.utter",
      "describe": "Glob to match utter files (.utter)",
      "type": "string"
    }
  }
}();
