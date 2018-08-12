# @clitools/keystore

Plugin for access to system key management for secure storage of credentials ([keystore.js](lib/error-handler.js), _using:_ [keytar](https://github.com/atom/node-keytar))

## Features

* Store credentials in your system's keystore
* Expose cli commands to manage the credentials
* Encrypted import/export functionality

## System requirements

Only tested with Linux (Ubuntu/Mint), Mac OS maybe also works, Windows is not supported.

* `libsecret` is a dependency of [keytar](https://github.com/atom/node-keytar)
  * Debian/Ubuntu: `sudo apt-get install libsecret-1-dev`
  * Red Hat-based: `sudo yum install libsecret-devel`
  * Arch Linux: `sudo pacman -S libsecret`
* `7z` archiver used to export/import credentials
  * Debian/Ubuntu: `sudo apt-get install p7zip p7zip-full p7zip-rar`
  * Red Hat-based: `sudo yum install -y -q p7zip p7zip-plugins`
  * Arch Linux: `sudo pacman -S p7zip`

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