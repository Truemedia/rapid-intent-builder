# Rapid intent builder
Rapid intent builder for quick prototyping/development of complex intent/s

Works for the following eco-sytems:
- [Alexa](https://developer.amazon.com/docs/ask-overviews/build-skills-with-the-alexa-skills-kit.html)
- [Rasa](https://rasa.com/docs/nlu/)

## Installation
```bash
  npm i -g rapid-intent-builder
```

## Usage
```bash
  rapid-intent-builder --utters=samples/en_GB/*.utter
```

## Options
Run `rapid-intent-builder --help` for a list of options (only env and utters currently supported)

## Reference
- [Utter file](https://www.npmjs.com/package/verbose-utterance)

## Support
### Current adapters
- Alexa `rapid-intent-builder --adapter=alexa --invoke=skillName`
- Rasa `rapid-intent-builder --adapter=rasa`
### Coming soon
- Molir
