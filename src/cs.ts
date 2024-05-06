// const _script1 = document.createElement('script')
// _script1.setAttribute('src', chrome.runtime.getURL('/assets/start1.js'))
// document.body.appendChild(_script1)
// _script1.parentNode?.removeChild(_script1)

// const _script2 = document.createElement('script')
// _script2.setAttribute('src', chrome.runtime.getURL('/assets/start2.js'))
// document.body.appendChild(_script2)
// _script2.parentNode?.removeChild(_script2)

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getDom') {
    // const html = document.getElementsByTagName('html')[0]
    const doc = new DOMParser().parseFromString(document.body.outerHTML, 'text/html');

    doc.body.querySelectorAll('script').forEach(script => {
      // script.parentNode?.removeChild(script)
      script.remove()
    })

    doc.body.querySelectorAll('style').forEach(style => {
      // style.parentNode?.removeChild(style)
      style.remove()
    })

    doc.body.querySelectorAll('link').forEach(link => {
      // link.parentNode?.removeChild(link)
      link.remove()
    })

    doc.querySelectorAll('*').forEach(element => {
      Array.from(element.attributes).forEach(attribute => {
        // if (!['id', 'class', 'type', 'action', 'method'].includes(attribute.name)) {
          element.removeAttributeNode(attribute)
        // }
      })
    })

    // // Function to find all elements with a direct text node within the document body
    // function findElementsWithDirectText() {
    //   const elementsWithDirectText = [];

    //   // Function to check if an element has a direct text node
    //   function hasDirectTextNode(element) {
    //     for (let i = 0; i < element.childNodes.length; i++) {
    //       const child = element.childNodes[i];
    //       if (child.nodeType === 3 && child.nodeValue.trim() !== '') {
    //         return true;
    //       }
    //     }
    //     return false;
    //   }

    //   // Iterate over child nodes of the document body
    //   const bodyChildren = document.body.childNodes;
    //   for (let i = 0; i < bodyChildren.length; i++) {
    //     const child = bodyChildren[i];
    //     if (child.nodeType === 1 && hasDirectTextNode(child)) {
    //       elementsWithDirectText.push(child);
    //     }
    //   }

    //   return elementsWithDirectText;
    // }

    // // Call the function to find elements with direct text nodes within the document body
    // const elementsWithDirectText = findElementsWithDirectText();

    // Function to remove all child elements from the document body
    // function removeAllChildNodes(parent) {
    //   while (parent.firstChild) {
    //     parent.removeChild(parent.firstChild);
    //   }
    // }

    // // Function to attach a list of elements to the document body
    // function attachElementsToBody(elements) {
    //   const body = document.body;
    //   removeAllChildNodes(body); // Remove all existing child elements from the body
    //   elements.forEach(element => {
    //     body.appendChild(element); // Append each element to the body
    //   });
    // }

    // // Call the function to attach the list of elements to the document body
    // attachElementsToBody(elementsWithDirectText);

    // Maybe we can preserve an array-like structure of the page?
    // Maybe we can remove the ids and classes from LLM input and if LLM wants to perform an action, we get it from an index in the array and then convert it to actual id.

    sendResponse(doc.body.outerHTML)
  }
})
