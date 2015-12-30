Package.describe({
  name: 'fourquet:anti-gravity',
  version: '1.0.4',
  summary: 'Plugin for Constellation for finding out-of-date packages.',
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
      'constellation:console@1.4.0',
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
