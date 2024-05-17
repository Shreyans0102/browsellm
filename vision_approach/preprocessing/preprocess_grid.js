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