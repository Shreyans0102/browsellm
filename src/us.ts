window.addEventListener('message', async function (event) {
  const message = event.data
  if (message.action === 'injectCode') {
    eval(message.code)
  }
})

