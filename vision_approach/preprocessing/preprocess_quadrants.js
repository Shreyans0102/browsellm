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
