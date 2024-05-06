export default () => {
  window.scrollTo(0, 0)

  const bodyRect = document.body.getBoundingClientRect()

  const items = Array.prototype.slice.call(
    document.querySelectorAll('*')
  ).map(function (element) {
    const rect = element.getBoundingClientRect()
    return {
      element: element,
      include: (element.tagName === 'BUTTON' || element.tagName === 'A' || element.tagName === 'INPUT' || (element.onclick !== null) || window.getComputedStyle(element).cursor == 'pointer'),
      rect: {
        left: Math.max(rect.left - bodyRect.x, 0),
        top: Math.max(rect.top - bodyRect.y, 0),
        right: Math.min(rect.right - bodyRect.x, document.body.clientWidth),
        bottom: Math.min(rect.bottom - bodyRect.y, document.body.clientHeight)
      },
      text: element.textContent.trim().replace(/\s{2,}/g, ' ')
    }
  })
}
