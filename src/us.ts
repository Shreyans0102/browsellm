// chrome.runtime.onUserScriptMessage?.addListener((message, sender, sendResponse) => {
//   console.log(message)
//   sendResponse(message)
// })

// chrome.runtime.onMessage?.addListener((message, sender, sendResponse) => {
//   console.log(message)
//   sendResponse(message)
// })

// const post = (message: any) => window.postMessage(message)

window.addEventListener('message', async function (event) {
  const message = event.data
  if (message.action === 'injectCode') {
    // await chrome.runtime.sendMessage({response: "Response from the content script!"})
    eval(message.code)

    // await chrome.storage.session.set({
    //   // dom: document.getElementsByName('html')[0].outerHTML,
    //   dom: 'something',
    // })

    // const queryOptions = { active: true, lastFocusedWindow: true }
    // const [tab] = await chrome.tabs.query(queryOptions)

    // if (tab.id) {
    //   await chrome.scripting.executeScript({
    //     target: { tabId: tab.id, allFrames: true },
    //     func: post,
    //     args: [{ response: 'Response!' }],
    //   })
    // }
  }
})

