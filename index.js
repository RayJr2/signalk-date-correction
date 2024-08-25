module.exports = function(app) {
    var plugin = {};
    var unsubscribes = [];
  
    plugin.id = "signalk-date-correction";
    plugin.name = "Date-Time Correction Plugin";
    plugin.description = "A plugin to correct sensor date-time data to match the current system date while keeping the correct time.";
  
    plugin.schema = {
      type: "object",
      properties: {
        enabled: {
          type: "boolean",
          title: "Enable Plugin",
          default: true
        }
      }
    };
  
    plugin.start = function(options) {
      app.debug("Plugin started");
  
      function correctDateTime(inputTime) {
        const now = new Date();
        const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const inputDate = new Date(inputTime);
  
        if (
          inputDate.getDate() !== currentDate.getDate() ||
          inputDate.getMonth() !== currentDate.getMonth() ||
          inputDate.getFullYear() !== currentDate.getFullYear()
        ) {
          app.debug(`Correcting date from ${inputDate} to ${currentDate} with the same time`);
          inputDate.setFullYear(currentDate.getFullYear());
          inputDate.setMonth(currentDate.getMonth());
          inputDate.setDate(currentDate.getDate());
        }
  
        return inputDate.toISOString();
      }
  
      unsubscribes.push(
        app.streambundle.getSelfStream('navigation.datetime').forEach(time => {
          const correctedTime = correctDateTime(time);
          app.debug(`Corrected Time: ${correctedTime}`);
          
          // Optionally, you can update the Signal K model with the corrected time:
          app.handleMessage(plugin.id, {
            updates: [
              {
                values: [
                  {
                    path: 'navigation.datetime',
                    value: correctedTime
                  }
                ]
              }
            ]
          });
        })
      );
    };
  
    plugin.stop = function() {
      app.debug("Plugin stopped");
      unsubscribes.forEach(f => f());
    };
  
    return plugin;
  };
  