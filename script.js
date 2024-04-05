document.addEventListener('DOMContentLoaded', () => {
  const gridSizeBtn = document.getElementById('grid-size-btn');
  gridSizeBtn.addEventListener('click', setGridSize);
  generateGrid(16); // Default grid size
});

function generateGrid(size) {
  const container = document.getElementById('grid-container');
  container.innerHTML = ''; // Clear existing grid
  const squareSize = 960 / size; // Calculate square size based on the container width

  for (let i = 0; i < size * size; i++) {
      const square = document.createElement('div');
      square.classList.add('grid-item');
      square.style.width = `${squareSize}px`;
      square.style.height = `${squareSize}px`;
      square.addEventListener('mouseover', darkenColor);
      square.setAttribute('data-darkness', '0');
      container.appendChild(square);
  }
}

function changeColor(e) {
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

function getRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}

function darkenColor(e) {
  const square = e.target;
  let currentDarkness = parseInt(square.getAttribute('data-darkness') || 0);

  // Check if the square is initially white; if so, apply a random color.
  if (square.style.backgroundColor === 'rgb(255, 255, 255)' || square.style.backgroundColor === '') {
    square.style.backgroundColor = getRandomColor();
    square.setAttribute('data-darkness', '1'); // Start the darkness counter at 1.
  } else if (currentDarkness < 10) {
    // Darken the color by a factor based on the current darkness level.
    currentDarkness += 1;
    square.setAttribute('data-darkness', currentDarkness.toString());
    
    // Extract the current RGB values and apply darkening.
    let rgb = square.style.backgroundColor.match(/\d+/g).map(Number); // Convert RGB values to numbers.
    rgb = rgb.map(color => Math.max(0, color - (25 * currentDarkness))); // Darken the color.
    square.style.backgroundColor = `rgb(${rgb.join(',')})`;
  }
}

