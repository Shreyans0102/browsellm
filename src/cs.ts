chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getDom') {
    sendResponse(document.getElementsByTagName('html')[0].outerHTML)
  }
})
