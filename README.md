Machine State Tracker
===============

Monitor machine state (memory, load average).

## How to use it?

```
$ npm install tracker-machine -g
```

To start it:

```
$ tracker-machine --host=http://localhost:5000
```

## Options

```
-i, --interval             Post interval (in seconds), defaults is 3 minutes
-hs, --host [host]         Reportr hostname
-u, --username [username]  Authentication username
-p, --password [password]  Authentication password
-e, --event [event]        Event name, default is "machine.state"
```

