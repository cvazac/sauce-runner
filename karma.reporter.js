var Reporter = function(baseReporterDecorator, config, logger, helper, formatError) {

  baseReporterDecorator(this)

  var allMessages = Object.create(null)
  this.onBrowserLog = function (browser, log, type) {
    allMessages[browser.name] = allMessages[browser.name] || []
    allMessages[browser.name].push(log)
  }

  this.onExit = function (done) {
    try {
      var results = Object.create(null)
      for (var browserName in allMessages) {
        var msgs = ''
        allMessages[browserName].forEach(function (msg) {
          msgs += msg
        })

        results[msgs] = results[msgs] || []
        results[msgs].push(browserName)
      }

      for (var result in results) {
        var browserNames = results[result]
        console.info(browserNames.join(', ') + ':\n' +
            allMessages[browserNames[0]].join('\n'))
      }

    }
    catch (e) {
      console.error(e)
    }
    done()
  }

}

Reporter.$inject = ['baseReporterDecorator', 'config', 'logger', 'helper', 'formatError']

module.exports = {
  'reporter:sauce-runner': ['type', Reporter]
}