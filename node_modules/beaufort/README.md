beaufort
========

A beaufort scale convertor for [node](http://nodejs.org). 

```js
var beaufort = require('beaufort')

var options = {unit: 'kmh', getName: true};

console.log(beaufort(42, options));
console.log(beaufort(12, options));

// 'strong breeze'
// 'gentle breeze'
```

## Installation

```bash
$ npm install beaufort
```

### Features

  * Supports kmh and mps out of the box
  * Gives beaufort numbers for 0-16
  * Has wind speed descriptors for beaufort numbers 0-12

## Tests

The test suite relies upon a few dependancies.

```bash
$ npm install
$ npm test
```
### Version History
 * 1.3.0: Initial Release

### License

[APACHE-2.0](LICENSE)

