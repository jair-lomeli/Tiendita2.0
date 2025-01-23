'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');

const app = (module.exports = loopback());

app.start = function () {
  // Start the web server
  return app.listen(function () {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources, and middleware
boot(app, __dirname, function (err) {
  if (err) {
    console.error('Error during boot:', err);
    throw err;
  }

  // Start the server if `$ node server.js`
  if (require.main === module) {
    app.start();

    // Ensure autoupdate only executes once
    const ds = app.datasources.mysqlDev;
    if (ds.connected) {
      runAutoupdate(ds);
    } else {
      ds.once('connected', () => runAutoupdate(ds));
    }
  }
});

// Function to handle autoupdate
function runAutoupdate(ds) {
  ds.autoupdate(function (err) {
    if (err) {
      console.error('Error during autoupdate:', err);
      return;
    }
    console.log('Tablas actualizadas o creadas exitosamente en la base de datos.');
  });
}
