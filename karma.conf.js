require('dotenv').config({silent: true})

module.exports = function(config) {

  var karmaConf = {
    frameworks: ['mocha'],
    browsers: ['Safari', 'Chrome', 'Firefox', 'ChromeCanary'], // local browsers
    singleRun: true,
    files: [
      'test/*.js'
    ]
    , reporters: ['sauce-runner']
  }

  if (false) {
    var customLaunchers = {}
    ;['8.0', '9.0', '10.0', '11.0'].forEach(function (version) {
      customLaunchers[Object.keys(customLaunchers).length] = {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        version: version,
        platform: 'Windows 7'
      }
    })

    karmaConf = Object.assign({}, karmaConf, {
      sauceLabs: {
        username: process.env.SL_USERNAME,
        accessKey: process.env.SL_ACCESSKEY,
      },
      customLaunchers: customLaunchers,
      browsers: Object.keys(customLaunchers),
    })
  }

  config.plugins.push(require('./karma.reporter'))
  config.set(karmaConf)
};
