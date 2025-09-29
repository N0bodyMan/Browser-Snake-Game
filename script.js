// Simple Snake Game — script.js
stopLoop();
tileSize = canvas.width / TILE_COUNT;
const intervalMs = Math.round(1000 / gameSpeed);
gameInterval = setInterval(loopTick, intervalMs);
}


function stopLoop(){
if(gameInterval) clearInterval(gameInterval);
gameInterval = null;
}


// input
window.addEventListener('keydown', (e) => {
const key = e.key;
if(gameOver && key === 'Enter'){
resetGame();
return;
}
if(key === 'p' || key === 'P'){
togglePause(); return;
}
if(directionLocked) return; // prevent double-change in one tick


if(key === 'ArrowUp' || key === 'w' || key === 'W'){
if(velocity.y === 1) return; // prevent reverse
velocity = { x: 0, y: -1 };
directionLocked = true;
}
if(key === 'ArrowDown' || key === 's' || key === 'S'){
if(velocity.y === -1) return;
velocity = { x: 0, y: 1 };
directionLocked = true;
}
if(key === 'ArrowLeft' || key === 'a' || key === 'A'){
if(velocity.x === 1) return;
velocity = { x: -1, y: 0 };
directionLocked = true;
}
if(key === 'ArrowRight' || key === 'd' || key === 'D'){
if(velocity.x === -1) return;
velocity = { x: 1, y: 0 };
directionLocked = true;
}
});


// UI controls
pauseBtn.addEventListener('click', togglePause);
speedSelect.addEventListener('change', () => {
gameSpeed = parseInt(speedSelect.value, 10);
startLoop();
});


function togglePause(){
paused = !paused;
pauseBtn.textContent = paused ? 'Resume' : 'Pause';
if(paused) stopLoop(); else startLoop();
}


// Init
placeFood();
startLoop();


// Responsiveness: resize canvas if container changes
window.addEventListener('resize', () => {
const rect = canvas.getBoundingClientRect();
// keep square based on width
const size = Math.min(rect.width, 480);
canvas.width = size;
canvas.height = size;
tileSize = canvas.width / TILE_COUNT;
draw();
});
