var fs = Npm.require('fs');
var Future = Npm.require('fibers/future');

Meteor.methods({
  'fourquet:anti-gravity/app-package-information': function() {
    var filePath = process.env.PWD + '/.meteor/versions';
    var packages = [];
    var packageNameString = '';
    var future = new Future();
    fs.exists(filePath, function(exists) {
      if (exists) {
        fs.readFile(filePath, function(err, data) {
          var bufferString = data.toString();
          var bufferStringSplit = bufferString.split('\n');
          if (bufferStringSplit[bufferStringSplit.length - 1] === '') {
            bufferStringSplit.pop();
          }
          bufferStringSplit.map(function(item) {
            packageNameString += (packageNameString === '') ? item.split('@')[0] : ',' + item.split('@')[0];
            packages.push(objectify(item));
          });
          future.return({
            packageNameString: packageNameString,
            packages: packages,
          });
        });
      }
    });
    return future.wait();
  },
  'fourquet:anti-gravity/meteor-package-information': function(packageNameString) {
    var url = 'https://atmospherejs.com/a/packages/findByNames?names=' + packageNameString;
    var future = new Future();
    var result = HTTP.get(url, {
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }, Meteor.bindEnvironment(function(error, result) {
      if (error) {
        future.throw(error);
      } else {
        future.return(result.data);
      }
    }));
    return future.wait();
  },
  'fourquet:anti-gravity/package-difference': function() {
    var future = new Future();
    Meteor.call('fourquet:anti-gravity/app-package-information', function(error, result) {
      if (error) {
        future.throw(error);
      } else {
        future.return(result);
      }
    });
    var appPackageInfo = future.wait();
    var meteorPackageInformation = Meteor.call('fourquet:anti-gravity/meteor-package-information', appPackageInfo.packageNameString);
    var appPackages = _.reduce(appPackageInfo.packages, function(memo, package) {
      return _.extend(memo, package);
    }, {});
    var packageDifferences = [];
    _.each(meteorPackageInformation, function(meteorPackage) {
      if (appPackages[meteorPackage.name] &&
        appPackages[meteorPackage.name] !==
        meteorPackage.latestVersion.version) {
        var d = new Date();
        d.setTime(meteorPackage.latestVersion.published.$date);
        var publishDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
        packageDifferences.push({
          packageName: meteorPackage.name,
          currentAppVersion: appPackages[meteorPackage.name],
          latestMeteorVersion: meteorPackage.latestVersion.version,
          publishDate: publishDate,
        });
      }
    });
    return packageDifferences;
  },
});

function objectify(item) {
  var itemSplit = {};
  itemSplit[[item.split('@')[0]]] = item.split('@')[1];
  return itemSplit;
};
