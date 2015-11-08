Package.describe({
  name: 'old-package-tester',
  version: '0.0.1',
  summary: '',
  git: '',
  documentation: ''
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use('momentjs:moment');
  api.imply('momentjs:moment');
});
