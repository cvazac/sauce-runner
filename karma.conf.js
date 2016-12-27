module.exports = function(config) {

  var karmaConf = {
    frameworks: ['mocha'],
    browsers: ['Safari', 'Chrome', 'Firefox', 'ChromeCanary'], // local browsers
    singleRun: true,
    files: [
      'test/*.js'
    ]
    , reporters: ['delta']
  }

  if (false) {
    var customLaunchers = {
      'SL_Chrome1': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        version: 11.0,
        platform: 'Windows 7'
      },
      'SL_Chrome2': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        version: 10.0,
        platform: 'Windows 7'
      },
      'SL_Chrome3': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        version: 9.0,
        platform: 'Windows 7'
      },
      'SL_Chrome4': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        version: 8.0,
        platform: 'Windows 7'
      }
    }

    karmaConf = Object.assign({}, karmaConf, {
      sauceLabs: {
        TODOtestName: 'Web App Unit Tests',
        username: 'cvazac-ak',
        accessKey: '363b6174-74ab-42fe-9a61-886e42e76bcc'
      },
      customLaunchers: customLaunchers,
      browsers: Object.keys(customLaunchers),
    })
  }

  config.plugins.push(require('./delta-reporter'))
  config.set(karmaConf)
};
