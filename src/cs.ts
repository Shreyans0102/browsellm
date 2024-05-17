import { updateEventListener } from '@miyauci/get-event-listeners'
import { convert } from 'html-to-text'

const getEventListeners = updateEventListener()

document.addEventListener('DOMContentLoaded', () => document.body.querySelectorAll('*').forEach((el, index) => el.setAttribute('llm-index', index.toString())))

const inputExtractor = (el: NodeListOf<HTMLElement>) => {
  return Array.prototype.slice.call(el).filter((element: HTMLElement) => {
    return element.checkVisibility({
      checkOpacity: true,
      checkVisibilityCSS: true,
    }) && (
      (element.tagName.toLowerCase() === 'input' && [
        'email',
        'password',
        'search',
        'tel',
        'text',
        'url',
        'number',
        'date',
        'datetime-local',
        'month',
        'time',
        'week'
      ].includes(element.getAttribute('type') || 'text'))
      || (element.tagName.toLocaleLowerCase() === 'textarea')
      || (element.hasAttribute('contenteditable') && element.getAttribute('contenteditable') !== 'false')
    )
  }).map((element: HTMLElement) => element.cloneNode(true))
}

const clickExtractor = (el: NodeListOf<HTMLElement>) => {
  // window.scrollTo(0, 0)

  // const bodyRect = document.body.getBoundingClientRect()

  return Array.prototype.slice.call(el).filter((element: HTMLElement) => {
    const listeners = getEventListeners(element)

    return element.checkVisibility({
      checkOpacity: true,
      checkVisibilityCSS: true,
    }) && (!!listeners.click || (element.onclick !== null) || window.getComputedStyle(element).cursor === 'pointer')
  }).map((element: HTMLElement) => element.cloneNode(true))
  // .map(element => {
  //   const rect = element.getBoundingClientRect()

  //   return {
  //     rect: {
  //       left: Math.max(rect.left - bodyRect.x, 0),
  //       top: Math.max(rect.top - bodyRect.y, 0),
  //       right: Math.min(rect.right - bodyRect.x, document.body.clientWidth),
  //       bottom: Math.min(rect.bottom - bodyRect.y, document.body.clientHeight)
  //     },
  //     text: element.textContent.trim().replace(/\s{2,}/g, ' ')
  //   }
  // })
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getDom') {
    // // const html = document.getElementsByTagName('html')[0]
    // const doc = new DOMParser().parseFromString(document.body.outerHTML, 'text/html')

    // doc.body.querySelectorAll('script').forEach(script => {
    //   // script.parentNode?.removeChild(script)
    //   script.remove()
    // })

    // doc.body.querySelectorAll('style').forEach(style => {
    //   // style.parentNode?.removeChild(style)
    //   style.remove()
    // })

    // doc.body.querySelectorAll('link').forEach(link => {
    //   // link.parentNode?.removeChild(link)
    //   link.remove()
    // })

    // // doc.querySelectorAll('*').forEach(element => {
    // //   Array.from(element.attributes).forEach(attribute => {
    // //     // if (!['id', 'class', 'type', 'action', 'method'].includes(attribute.name)) {
    // //       element.removeAttributeNode(attribute)
    // //     // }
    // //   })
    // // })

    // // // Function to find all elements with a direct text node within the document body
    // // function findElementsWithDirectText() {
    // //   const elementsWithDirectText = [];

    // //   // Function to check if an element has a direct text node
    // //   function hasDirectTextNode(element) {
    // //     for (let i = 0; i < element.childNodes.length; i++) {
    // //       const child = element.childNodes[i];
    // //       if (child.nodeType === 3 && child.nodeValue.trim() !== '') {
    // //         return true;
    // //       }
    // //     }
    // //     return false;
    // //   }

    // //   // Iterate over child nodes of the document body
    // //   const bodyChildren = document.body.childNodes;
    // //   for (let i = 0; i < bodyChildren.length; i++) {
    // //     const child = bodyChildren[i];
    // //     if (child.nodeType === 1 && hasDirectTextNode(child)) {
    // //       elementsWithDirectText.push(child);
    // //     }
    // //   }

    // //   return elementsWithDirectText;
    // // }

    // // // Call the function to find elements with direct text nodes within the document body
    // // const elementsWithDirectText = findElementsWithDirectText();

    // // Function to remove all child elements from the document body
    // // function removeAllChildNodes(parent) {
    // //   while (parent.firstChild) {
    // //     parent.removeChild(parent.firstChild);
    // //   }
    // // }

    // // // Function to attach a list of elements to the document body
    // // function attachElementsToBody(elements) {
    // //   const body = document.body;
    // //   removeAllChildNodes(body); // Remove all existing child elements from the body
    // //   elements.forEach(element => {
    // //     body.appendChild(element); // Append each element to the body
    // //   });
    // // }

    // // // Call the function to attach the list of elements to the document body
    // // attachElementsToBody(elementsWithDirectText);

    // // Maybe we can preserve an array-like structure of the page?
    // // Maybe we can remove the ids and classes from LLM input and if LLM wants to perform an action, we get it from an index in the array and then convert it to actual id.

    // sendResponse(doc.body.outerHTML)
    
    const clickables = clickExtractor(document.querySelectorAll('*')) as Array<HTMLElement>
    const inputs = inputExtractor(document.querySelectorAll('*')) as Array<HTMLElement>
    // const dom = document.documentElement.cloneNode(true) as HTMLElement

    // dom.querySelectorAll('*').forEach(el => {
    //   if (el.checkVisibility({
    //     checkOpacity: true,
    //     checkVisibilityCSS: true,
    //   }) && !inputs.includes(el as HTMLElement) && !clickables.includes(el as HTMLElement)) {
    //     el.remove()
    //   }
    // })


    // Array.prototype.slice.call(document.body.querySelectorAll('*')).filter(el => el.checkVisibility({
    //   checkOpacity: true,
    //   checkVisibilityCSS: true,
    // }) && !inputs.includes(el) && !clickables.includes(el)).forEach(el => el.setAttribute('browse-llm-content', 'true'))

    const trimmer = (elements: Array<HTMLElement>) => elements.map(el => {
      el.querySelectorAll('script').forEach(script => {
        // script.parentNode?.removeChild(script)
        script.remove()
      })

      el.querySelectorAll('style').forEach(style => {
        // style.parentNode?.removeChild(style)
        style.remove()
      })

      // el.querySelectorAll('svg').forEach(svg => {
      //   // svg.parentNode?.removeChild(svg)
      //   svg.remove()
      // })

      // el.querySelectorAll('img').forEach(img => {
      //   // img.parentNode?.removeChild(img)
      //   img.remove()
      // })

      // el.querySelectorAll('picture').forEach(picture => {
      //   // picture.parentNode?.removeChild(picture)
      //   picture.remove()
      // })

      Array.from(el.attributes).forEach(attribute => {
        if (!attribute.name.startsWith('llm-') && !attribute.name.startsWith('aria-') && !['value', 'role', 'type', 'action', 'method', 'name', 'title', 'alt', 'placeholder'].includes(attribute.name)) {
          el.removeAttributeNode(attribute)
        }
      })

      el.innerHTML = el.textContent || ''

      return el.outerHTML
    })

    // const indexer = (els: Array<HTMLElement>, idPrefix: string) => els.map((el, llmIndex) => {
    //   el.setAttribute('llm-index', idPrefix + llmIndex.toString())
    //   return el
    // })

    sendResponse(JSON.stringify({
      inputs: trimmer(inputs),
      clickables: trimmer(clickables),
      // content: convert(document.body.innerHTML, {
      //   wordwrap: false,
      // }),
      content: convert(document.body.innerHTML, {
        wordwrap: false,
        selectors: [
          {
            selector: 'a',
            // options: {
            //   ignoreHref: true,
            // },
            format: 'skip',
          },
          {
            selector: 'img',
            format: 'skip',
          },
          {
            selector: 'picture',
            format: 'skip',
          },
          {
            selector: 'svg',
            format: 'skip',
          },
        ],
      }),
    }))
  }
})
