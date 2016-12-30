var fs = require('fs')
var saucelabs = require('saucelabs')
var Server = require('karma').Server
const execFileSync = require('child_process').execFileSync
require('dotenv').config({silent: true})
const sauce = false

var maybeFetchBrowsers = (callback) => {
  if (!sauce) {
    callback({
      browsers: ['Safari', 'Chrome', 'Firefox', 'ChromeCanary'], // local browsers
    })
    return
  }

  var sl = new saucelabs({
    username: process.env.SL_USERNAME,
    password: process.env.SL_ACCESSKEY,
  })
  sl.getAllBrowsers(function (err, res) {
    var customLaunchers = {}

    res./*slice(0, 3).*/forEach(function ({api_name, short_version, long_version, os}) {
      const key = `${api_name}_${long_version}`
      customLaunchers[key] = {
        base: 'SauceLabs',
        browserName: api_name,
        version: short_version,
        platform: os,
      }
    })

    callback({
      customLaunchers,
      browsers: Object.keys(customLaunchers),
      sauceLabs: {
        username: process.env.SL_USERNAME,
        accessKey: process.env.SL_ACCESSKEY,
      },
    })
  })
}

const writeFile = (code) => {
  var dir = process.cwd() + '/tmp'
  try {
    fs.mkdirSync(dir)
  } catch (e) {
    if (e.code !== 'EEXIST') {
      throw e
    }
  }

  function wrapCode() {
    return `describe('', function () {
  it('', function () {
${code}
  })
})
`
  }

  function _writeFile() {
    var path = `${dir}/${Math.random()}.js`
    try {
      var fd = fs.openSync(path, 'wx')
      fs.writeFileSync(fd, wrapCode())
      fs.closeSync(fd)
      return path
    } catch (e) {
      if (e.code === 'EEXIST') {
        return _writeFile()
      }
      throw e
    }
  }

  return _writeFile()
}

const startKarma = (path, config) => {
  var karmaConf = Object.assign({
    retryLimit: 1,
    frameworks: ['mocha'],
    singleRun: true,
    files: [path],
    plugins: ['karma-*', require('../karma.reporter')],
    reporters: ['sauce-runner'],
  }, config)

  var karmaServer = new Server(karmaConf, (exitCode) => {
    console.log('Karma has exited with ' + exitCode)
    fs.unlinkSync(path)
  })
  karmaServer.start()
}

module.exports = (req, res) => {
  const {body: {code}} = req
  maybeFetchBrowsers((config) => {
    var path = writeFile(code)
    startKarma(path, config)
  })

  res.json({
    cav: 123,
  })
}
