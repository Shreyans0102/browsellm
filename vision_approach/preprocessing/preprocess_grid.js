/**
* This script creates a grid overlay on the webpage, with lines and labels displayed
* at every 10 pixels of the viewport dimensions. The grid is intended to help with
* positioning and layout tasks.
*
* The script starts by getting the current viewport dimensions using `window.innerWidth`
* and `window.innerHeight`.
*
* A new `<div>` element is created to serve as the container for the grid, and it is
* appended to the `<body>` element of the document. The container is positioned absolutely
* at the top-left corner of the viewport and given a high `z-index` value to ensure it
* appears on top of other elements. The `pointerEvents` property is set to `none` to allow
* clicks and interactions to pass through the grid container.
*
* Two helper functions are defined:
*
* 1. `createLine(x, y, isHorizontal)`: This function creates a new `<div>` element to
*    represent either a horizontal or vertical line in the grid. The line is positioned
*    absolutely using the provided `x` and `y` coordinates, and its dimensions are set
*    based on the viewport width and height, respectively. The line has a black background
*    color for visibility.
*
* 2. `createLabel(x, y, text)`: This function creates a new `<div>` element to represent
*    a label in the grid. The label is positioned absolutely using the provided `x` and `y`
*    coordinates, and its text content is set to the provided `text` value. The label has
*    a red color and a small font size for visibility.
*
* The script then generates the grid lines and labels using two nested loops:
*
* 1. The outer loop iterates from 0 to the viewport width, incrementing by 10 pixels each
*    time. For each iteration, it creates a vertical line using `createLine(i, 0, false)`
*    and a vertical label using `createLabel(i, 0, i)`.
*
* 2. The inner loop iterates from 0 to the viewport height, incrementing by 10 pixels each
*    time. For each iteration, it creates a horizontal line using `createLine(0, i, true)`
*    and a horizontal label using `createLabel(0, i, i)`.
*
* The result of running this script is a grid overlay on the webpage, with lines and labels
* displayed at every 10 pixels of the viewport dimensions. This grid can be useful for
* positioning and layout tasks, as it provides a visual reference for pixel coordinates and
* measurements.
*/


// Get viewport dimensions
const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

// Create a container for the grid
const gridContainer = document.createElement('div');
document.body.appendChild(gridContainer);
gridContainer.style.position = 'absolute';
gridContainer.style.top = '0';
gridContainer.style.left = '0';
gridContainer.style.pointerEvents = 'none'; // Allows clicks to pass through
gridContainer.style.zIndex = '9999';
gridContainer.id = 'gridContainer';

// Function to create a line
function createLine(x, y, isHorizontal) {
  const line = document.createElement('div');
  line.style.position = 'absolute';
  line.style.backgroundColor = '#000'; // Black color for visibility
  if (isHorizontal) {
    line.style.left = '0';
    line.style.top = `${y}px`;
    line.style.width = `${viewportWidth}px`;
    line.style.height = '1px';
  } else {
    line.style.top = '0';
    line.style.left = `${x}px`;
    line.style.width = '1px';
    line.style.height = `${viewportHeight}px`;
  }
  gridContainer.appendChild(line);
}

// Function to create a label
function createLabel(x, y, text) {
  const label = document.createElement('div');
  label.style.position = 'absolute';
  label.style.left = `${x}px`;
  label.style.top = `${y}px`;
  label.style.color = '#F00'; // Red color for visibility
  label.style.fontSize = '10px';
  label.style.fontFamily = 'Arial, sans-serif';
  label.textContent = text;
  gridContainer.appendChild(label);
}

// Generate grid lines and labels every 10 pixels
for (let i = 0; i < viewportWidth; i += 10) {
  createLine(i, 0, false); // Vertical line
  createLabel(i, 0, `${i}`); // Vertical label
}
for (let i = 0; i < viewportHeight; i += 10) {
  createLine(0, i, true); // Horizontal line
  createLabel(0, i, `${i}`); // Horizontal label
}