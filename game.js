// Variables for the game
let hookY = 0;
let fish = [
  { y: 100, color: 'blue', points: 10 },
  { y: 200, color: 'red', points: -5 },
  { y: 300, color: 'green', points: 20 },
];
let score = 0;
let hookSpeed = 1;
let pullingHook = false;
let touchStartY;

// Function to draw the game
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the hook
  ctx.fillStyle = 'black';
  ctx.fillRect(150, hookY, 10, 50);

  // Draw the fish
  for (let f of fish) {
    ctx.fillStyle = f.color;
    ctx.fillRect(100, f.y, 50, 20);
  }
}

// Function to update the game
function update() {
  if (pullingHook) {
    hookY -= hookSpeed;
  } else {
    hookY += hookSpeed;
  }

  // Check for collisions with fish
  for (let f of fish) {
    if (hookY + 50 >= f.y && hookY <= f.y + 20) {
      score += f.points;
      console.log('Score:', score);
      hookY = 0;
      pullingHook = false;
    }
  }

  // Reset the hook if it goes too deep
  if (hookY > canvas.height) {
    hookY = 0;
    pullingHook = false;
  }

  draw();
}

// Function to handle touch start
function handleTouchStart(e) {
  touchStartY = e.touches[0].clientY;
}

// Function to handle touch end
function handleTouchEnd(e) {
  let touchEndY = e.changedTouches[0].clientY;
  if (touchEndY < touchStartY) {
    pullingHook = true; // Swipe forward to throw the line
  } else {
    pullingHook = false; // Swipe backward to reel in
  }
}

// Set up the game
let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchend', handleTouchEnd);
setInterval(update, 16);
