document.addEventListener('DOMContentLoaded', () => {
  const gridSizeBtn = document.getElementById('grid-size-btn');
  gridSizeBtn.addEventListener('click', setGridSize);
  generateGrid(16); // Default grid size
});

function generateGrid(size) {
  const container = document.getElementById('grid-container');
  container.innerHTML = ''; // Clear existing grid
  const squareSize = 960 / size; // Calculate square size based on total width and grid size

  for (let i = 0; i < size * size; i++) {
      const square = document.createElement('div');
      square.classList.add('grid-item');
      square.style.width = `${squareSize}px`;
      square.style.height = `${squareSize}px`;
      square.addEventListener('mouseover', changeColor);
      container.appendChild(square);
  }
}

function changeColor(e) {
  // Example simple color change. Modify for random color or progressive darkening.
  e.target.style.backgroundColor = '#555';
}

function setGridSize() {
  let newSize = prompt("Enter the new grid size (max 100):", "16");
  newSize = parseInt(newSize);
  if (newSize > 0 && newSize <= 100) {
      generateGrid(newSize);
  } else {
      alert("Invalid size. Please enter a number between 1 and 100.");
  }
}