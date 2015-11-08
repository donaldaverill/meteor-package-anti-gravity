Package.describe({
  name: 'fourquet:anti-gravity',
  version: '1.0.0',
  summary: '',
  git: '',
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
