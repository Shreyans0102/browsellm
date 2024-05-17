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
