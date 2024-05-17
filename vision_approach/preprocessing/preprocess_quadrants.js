/**
* This script creates a visual representation of quadrants on the webpage, covering the
* entire viewport. The quadrants are color-coded and labeled with numbers.
*
* The script starts by creating a container `<div>` element that will hold the quadrants.
* This container is positioned fixed at the top-left corner of the viewport, with its width
* and height set to 100vw and 100vh, respectively. The `pointerEvents` property is set to
* `none` to allow interactions with the page content below the quadrants.
*
* An array of colors is defined to be used for each quadrant's background color.
*
* The `createQuadrant` function is responsible for creating and styling each quadrant. It
* takes two arguments: `number` (the quadrant number) and `color` (the background color for
* the quadrant). The function creates a new `<div>` element for the quadrant and sets its
* position, width, height, and background color using inline styles.
*
* The function also creates a label `<div>` element for the quadrant and sets its text
* content to the quadrant number. The label is styled to have a larger font size, a slightly
* transparent black color, and is positioned and centered within the quadrant using flexbox
* styles. The `pointerEvents` property is set to `none` to prevent the label from blocking
* interactions with the page content below.
*
* The quadrant's position is determined by a `switch` statement based on the quadrant number:
*
* 1. Quadrant 1 is positioned at the top-left (top: 0, left: 0)
* 2. Quadrant 2 is positioned at the top-right (top: 0, right: 0)
* 3. Quadrant 3 is positioned at the bottom-left (bottom: 0, left: 0)
* 4. Quadrant 4 is positioned at the bottom-right (bottom: 0, right: 0)
*
* After creating and styling the quadrant and its label, the label is appended to the
* quadrant, and the quadrant is appended to the container.
*
* Finally, the script calls the `createQuadrant` function for each color in the `colors`
* array, creating and appending the quadrants to the container.
*
* When the script runs, it will create a visual representation of four quadrants covering
* the entire viewport, each with a different color and a number label. This visual aid can
* be useful for layout and positioning tasks, particularly when working with quadrant-based
* designs or layouts.
*/

// Create a container for the quadrants to keep them together
const container = document.createElement('div');
container.style.position = 'fixed';
container.style.top = '0';
container.style.left = '0';
container.style.width = '100vw';
container.style.height = '100vh';
container.style.pointerEvents = 'none'; // Allows interaction with the page below
container.id = 'color_quads';
document.body.appendChild(container);

// Define colors for each quadrant
const colors = ['rgba(255, 0, 0, 0.2)', 'rgba(0, 255, 0, 0.2)', 'rgba(0, 0, 255, 0.2)', 'rgba(255, 255, 0, 0.2)'];

// Function to create and style each quadrant
function createQuadrant(number, color) {
  const quadrant = document.createElement('div');
  quadrant.style.position = 'absolute';
  quadrant.style.width = '50vw';
  quadrant.style.height = '50vh';
  quadrant.style.backgroundColor = color;
  
  // Determine the quadrant's position
  switch(number) {
    case 1:
      quadrant.style.top = '0';
      quadrant.style.left = '0';
      break;
    case 2:
      quadrant.style.top = '0';
      quadrant.style.right = '0';
      break;
    case 3:
      quadrant.style.bottom = '0';
      quadrant.style.left = '0';
      break;
    case 4:
      quadrant.style.bottom = '0';
      quadrant.style.right = '0';
      break;
  }
  
  // Add a label to the quadrant
  const label = document.createElement('div');
  label.textContent = number;
  label.style.fontSize = '4rem'; // Make the label larger
  label.style.color = 'rgba(0, 0, 0, 0.5)'; // Make the label slightly transparent
  label.style.position = 'absolute';
  label.style.width = '100%';
  label.style.height = '100%';
  label.style.display = 'flex';
  label.style.justifyContent = 'center';
  label.style.alignItems = 'center';
  label.style.pointerEvents = 'none'; // Prevents the label from blocking interactions
  
  quadrant.appendChild(label);
  container.appendChild(quadrant);
}

// Create and append each quadrant
colors.forEach((color, index) => createQuadrant(index + 1, color));
