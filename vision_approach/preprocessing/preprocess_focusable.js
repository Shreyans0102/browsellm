/**
* This script creates a list of visible and focusable elements on the page and assigns them
* tabindex values. It also creates a visual representation of the tabindex values by adding
* yellow boxes next to each focusable element.
*
* The `focusableSelector` is a CSS selector string that selects all focusable elements on
* the page, such as links, buttons, inputs, textareas, selects, details, and elements with
* a non-negative tabindex.
*
* The `focusableElements` is a NodeList containing all elements that match the `focusableSelector`.
*
* The `visibleFocusableElements` is initially set to the same NodeList as `focusableElements`,
* but it can be filtered further to remove disabled, hidden, or invisible elements.
*
* Each visible and focusable element is assigned a `tabindex` attribute value based on its index
* in the `visibleFocusableElements` NodeList.
*
* The script creates a new `<style>` element and appends it to the document's `<head>` section.
* This style defines the appearance of the `.tabindex-box` class, which is used for the visual
* representation of the tabindex values.
*
* The script then iterates over the `visibleFocusableElements` NodeList and creates a new
* `<span>` element with the `.tabindex-box` class for each element. The `tabindex` value of the
* element is displayed in the `<span>` element, and the `<span>` element is positioned next to
* the corresponding focusable element.
*
* To handle overlapping boxes, the script uses a `verticalOffsetMap` to track the vertical
* offsets of elements based on their position. If two elements have the same position, the
* second element's box is positioned below the first element's box to avoid overlap.
*/

// Selector to get all focusable elements
const focusableSelector = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]), #recaptcha-anchor, #g-recaptcha-response';

// Query all elements matching the selector
const focusableElements = document.querySelectorAll(focusableSelector);

// Print or use the NodeList of focusable elements
console.log(focusableElements);

// Filter out elements that are not visible or are disabled
// const visibleFocusableElements = Array.from(focusableElements).filter(el => {
//     return !(el.disabled || el.hidden || el.style.display === 'none' || el.style.visibility === 'hidden');
// });

const visibleFocusableElements = focusableElements

console.log(visibleFocusableElements);

visibleFocusableElements.forEach((element, index) => {
    element.setAttribute('tabindex', index);
    // if (element.id === 'recaptcha-anchor' || element.id==='g-recaptcha-response' || element.classList.contains('recaptcha-checkbox')) {
    //   element.setAttribute('tabindex', `RC${index}`);;
    // } else {
    //   element.setAttribute('tabindex', index);
    // }
  });
  
 
  const style = document.createElement('style');
  style.textContent = `
    .tabindex-box {
      display: inline-block; // Inline-block for natural flow
      position: absolute;
      top: 0;
      left: 100%; // Place to the right for minimal overlap risk
      padding: 2px 5px;
      background-color: yellow;
      border: 1px solid #ccc;
      color: black;
      font-size: 12px;
      border-radius: 3px;
      box-shadow: 1px 1px 3px rgba(0,0,0,0.3);
      white-space: nowrap;
      z-index: 1000;
      margin-left: 5px; // Add some space from the element
    }
  `;
  document.head.appendChild(style);

  const verticalOffsetMap = new Map(); // To track vertical offsets

visibleFocusableElements.forEach(element => {
  if (element) {
    const box = document.createElement('span');
    box.className = 'tabindex-box';
    box.textContent = element.getAttribute('tabindex');

    if (getComputedStyle(element).position === 'static') {
      element.style.position = 'relative';
    }

    // Check and update vertical offset if needed
    const rect = element.getBoundingClientRect();
    const key = `${rect.top}-${rect.left}`; // Unique key for position
    let currentOffset = verticalOffsetMap.get(key) || 0;
    box.style.top = `${currentOffset}px`; // Set vertical offset
    verticalOffsetMap.set(key, currentOffset + 20); // Increment for potential next box

    element.parentNode.insertBefore(box, element.nextSibling);
  } else {
    console.log('Element not found or undefined');
  }
});
