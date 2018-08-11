# @clitools/keystore

Plugin for access to system key management for secure storage of credentials ([keystore.js](lib/error-handler.js), _using:_ [keytar](https://github.com/atom/node-keytar))

## Installation

Run `npm i --save @clitools/keystore`, then just require the module.
Example:

```javascript
require('@clitools/base');
require('@clitools/keystore');

[...]
// Now you can use cli.keystore
cli.keystore.getCredentials('github');
```

## [Changelog](CHANGELOG.md)