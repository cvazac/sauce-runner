require('console.table'); // remove this, this sucks

var Reporter = function(baseReporterDecorator, config, logger, helper, formatError) {

  baseReporterDecorator(this)

  var allMessages = Object.create(null)
  this.onBrowserLog = function (browser, log, type) {
    allMessages[browser.name] = allMessages[browser.name] || []
    allMessages[browser.name].push(log)
  }

  this.onExit = function (done) {
    var results = Object.create(null)
    for (var browserName in allMessages) {
      var msgs = ''
      allMessages[browserName].forEach(function(msg) {
        msgs += msg
      })

      results[msgs] = results[msgs] || []
      results[msgs].push(browserName)
    }

    var differences = []
    for (var result in results) {
      var browserNames = results[result]
      differences.push({
        output: allMessages[browserNames[0]].join('\n'),
        browsers: browserNames.join(', '),
      })
    }

    console.table(differences)
    done()
  }

}

Reporter.$inject = ['baseReporterDecorator', 'config', 'logger', 'helper', 'formatError']

module.exports = {
  'reporter:delta': ['type', Reporter]
}