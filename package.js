Package.describe({
  name: 'fourquet:anti-gravity',
  version: '1.0.0',
  summary: 'Plugin for Constellation used to compare app packages with latest available from the Meteor package repository.',
  git: 'https://github.com/fourquet/meteor-package-anti-gravity',
  documentation: 'README.md',
  debugOnly: true
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use([
      'templating',
      'session',
      'blaze',
      'underscore',
      'ejson',
      'tracker',
      'reactive-var',
      'reactive-dict',
      'constellation:console@1.3.0',
    ],
    'client');
  api.imply('constellation:console');
  api.use([
    'ddp',
    'http',
    'package-version-parser@3.0.4',
  ]);
  api.addFiles([
    'anti-gravity.html',
    'anti-gravity.js'
  ], 'client');
  api.addFiles('server.js', 'server');
});
