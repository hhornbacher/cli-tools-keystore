const keytar = require('keytar');

global.cli.keystore = {
    getCredentials: (service) => keytar.getPassword(cli.programName, service)
        .then(JSON.parse),
    setCredentials: (service, credentials) => keytar.setPassword(cli.programName, service, JSON.stringify(credentials)),
    deleteCredentials: (service) => keytar.deletePassword(cli.programName, service),
    findCredentials: () => keytar.findCredentials(cli.programName)
};