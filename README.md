# signalk-date-correction
A plugin to correct sensor date-time data to match the current system date while keeping the correct time.

## What issue does this plug-in resolve?
Incorrect sensor date being sent to Signal K. 

## How to install.
- Navigate to the Signal K server’s plugin directory. This is usually located at ~/.signalk/node_modules/@signalk.
- Create a new directory for this plugin, named, 'signalk-date-correction'.
- Copy and paste files 'package.json', 'config.json' and 'index.js' into the newly created folder 'signalk-date-correction'.
- Restart your Signal K server to load the new plugin.