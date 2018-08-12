const keytar = require('keytar');

global.cli.keystore = {
    getCredentials: (service) => keytar.getPassword(cli.programName, service)
        .then(data => {
            if (!data) return null;
            return JSON.parse(
                Buffer.from(data, 'base64').toString('utf8')
            );
        }),
    setCredentials: (service, credentials) => keytar.setPassword(cli.programName, service, Buffer.from(JSON.stringify(credentials)).toString('base64')),
    deleteCredentials: (service) => keytar.deletePassword(cli.programName, service),
    findCredentials: () => keytar.findCredentials(cli.programName)
        .then((credentials) => credentials.map((cred) => ({
            service: cred.account,
            credentials: JSON.parse(
                Buffer.from(cred.password, 'base64').toString('utf8')
            )
        })))
};

cli.program
    .command('credentials <action> [params..]', 'Manage saved credentials', (program) => {
        program
            .positional('action', {
                describe: 'Action to perform on credentials',
                choices: ['get', 'set', 'rm', 'ls', 'migrate']
            });
    }, async ({ action, params }) => {
        switch (action) {
            case 'get':
                {
                    if (params.length !== 1) throw new Error('You have to pass one service name as argument');
                    const [service] = params;
                    const credentials = await cli.keystore.getCredentials(service);
                    if (!credentials) throw new Error('Service not found');
                    cli.ui.print(credentials);
                }
                return;
            case 'set':
                {
                    if (params.length !== 3) throw new Error('You have to pass one service name argument and the path and value for the field to update');
                    const [service, path, value] = params;
                    const credentials = await cli.keystore.getCredentials(service);
                    if (!credentials) throw new Error('Service not found');
                    cli._.set(credentials, path, value);
                    await cli.keystore.setCredentials(service, credentials);
                    cli.ui.print(credentials);
                }
                return;
            case 'rm':
                {
                    if (params.length !== 1) throw new Error('You have to pass one service name as argument');
                    const [service] = params;
                    cli.ui.print(await cli.keystore.deleteCredentials(service));
                }
                return;
            case 'ls':
                cli.ui.print(await cli.keystore.findCredentials());
                return;
        }
    });