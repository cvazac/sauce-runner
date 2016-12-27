describe('my test suite', function () {
  it('fails majestically', function () {
    if (window.XMLHttpRequest) {
      console.info(window.XMLHttpRequest.toString())
    } else {
      console.info('no XMLHttpRequest')
    }
  })
})
