#! /usr/bin/env node

var os = require('os');
var _ = require('lodash');
var program = require('commander');
var pkg = require('../package.json');
var Reportr = require('reportr-api');

program
.version(pkg.version)
.option('-i, --interval', 'Post interval (in seconds), defaults is 3 minutes', parseInt)
.option('-hs, --host [host]', 'Reportr hostname')
.option('-u, --username [username]', 'Authentication username')
.option('-p, --password [password]', 'Authentication password')
.option('-e, --event [event]', 'Event name, default is "machine.state"')
.parse(process.argv);

program.interval = program.interval || 3*60;
program.event = program.event || "machine.state";

if (!program.host) {
    console.log("Need 'host'");
    return process.exit(-1);
}

console.log("Configure with host:", program.host);
var client = new Reportr({
    host: program.host,
    auth: (program.username? { 'username': program.username, 'password': program.password } : null)
});

var update = function() {
    var properties = {
        'loadavg': _.first(os.loadavg()),
        'totalmem': os.totalmem(),
        'freemem': os.freemem()
    };

    client.postEvent(program.event, properties)
    .then(function() {
        console.log("posted");
    }, function(e) {
        console.log("failed:", e.message || e);
    });
};

setInterval(update, program.interval*1000);
update();
