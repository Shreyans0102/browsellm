chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const click = async (el: HTMLElement) => {
    const mouseDownEvent = new MouseEvent('mousedown', { bubbles: true, cancelable: true })
    const mouseUpEvent = new MouseEvent('mouseup', { bubbles: true, cancelable: true })
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true })

    el.dispatchEvent(mouseDownEvent)
    await delay(200 + Math.floor(Math.random() * 101))
    el.dispatchEvent(mouseUpEvent)
    await delay(Math.floor(Math.random() * 51))
    el.dispatchEvent(clickEvent)
  }

  if (message.action === 'startCaptcha') {
    const el = document.getElementById('recaptcha-anchor')
    if (el) {
      await click(el)
    }
  } else if (message.action === 'startCaptchaAudio') {
    const btn = document.getElementById('recaptcha-audio-button') as HTMLButtonElement
    if (btn) {
      await click(btn)
    }
  } else if (message.action === 'getCaptchaAudioUrl') {
    const el = document.getElementsByClassName('rc-audiochallenge-tdownload-link')[0]
    if (el) {
      sendResponse(el.getAttribute('href'))
    }
  } else if (message.action = 'setCaptchaText') {
    const input = document.getElementById('audio-response') as HTMLInputElement
    if (input) {
      input.value = message.data
      document.getElementById('recaptcha-verify-button')?.click()
    }
  }
})
