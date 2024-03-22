chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error))

chrome.userScripts.configureWorld({
  csp: "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  // messaging: true,
})

chrome.userScripts.getScripts({ ids: ['BrowseLLM'] })
  .then(scripts => {
    if (scripts.length > 0) {
      chrome.userScripts.unregister({ ids: ['BrowseLLM'] })
    }

    chrome.userScripts.register([{
      id: 'BrowseLLM',
      runAt: 'document_start',
      world: 'MAIN',
      matches: ['*://*/*'],
      js: [{ file: 'us.js' }],
    }])
  })
