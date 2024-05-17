// NodeList is visibleFocusableElements

function clickElementByTabIndex(tabIndex) {
    // Find elements by tabindex attribute
    const elements = document.querySelectorAll(`[tabindex="${tabIndex}"]`);

    // Check if any elements are found
    if (elements.length === 0) {
        console.log('No element found with tabindex:', tabIndex);
        return;
    }

    // Click the first element found with the given tabindex
    elements[0].click(); // Using .click() method to simulate a user click
    console.log('Clicked on element with tabindex:', tabIndex);
}

function clickElementAtIndex(index, nodeList=visibleFocusableElements,) {
    // Check if the index is within the bounds of the NodeList
    if (index >= 0 && index < nodeList.length) {
        // Check if the element is clickable, if not log a warning
        if (nodeList[index].click) {
            nodeList[index].click(); // Click the element at the given index
            console.log(`Clicked element at index ${index}`);
        } else {
            console.log(`Element at index ${index} does not support click`);
        }
    } else {
        console.log(`Index ${index} is out of bounds. NodeList length is ${nodeList.length}.`);
    }
}

// // Example of getting a NodeList
// const elements = document.querySelectorAll('button'); // This could be any selector

// // Example usage: click on the third button (index 2)
// clickElementAtIndex(elements, 2);


function enterTextAtIndex(index, text, nodeList=visibleFocusableElements) {
    // Check if the index is within the bounds of the NodeList
    if (index >= 0 && index < nodeList.length) {
        const element = nodeList[index];
        // Check if the element can accept text (e.g., input or textarea)
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.value = text; // Set the text in the element
            console.log(`Text "${text}" entered at index ${index}`);
        } else {
            console.log(`Element at index ${index} does not support text entry.`);
        }
    } else {
        console.log(`Index ${index} is out of bounds. NodeList length is ${nodeList.length}.`);
    }
}


// // Example of getting a NodeList of input elements
// const inputs = document.querySelectorAll('input[type="text"], textarea');

// // Example usage: Enter "Hello World" into the second input element (index 1)
// enterTextAtIndex(inputs, 1, "Hello World");
