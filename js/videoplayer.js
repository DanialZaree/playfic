const video = document.getElementById('video');
const playPauseButton = document.getElementById('play-pause');
const progressBar = document.getElementById('progress');
const skipBackButton = document.getElementById('skip-back');
const skipForwardButton = document.getElementById('skip-forward');
const volumeSlider = document.getElementById('volume');
const brightnessSlider = document.getElementById('brightness');
const currentTimeDisplay = document.getElementById('current-time');
const totalTimeDisplay = document.getElementById('total-time');
const loader = document.getElementById('loader');
const controls = document.querySelector('.controls');

let controlsTimeout;

// Show controls and set timeout to hide them
function showControls() {
  controls.classList.remove('hidden');
  clearTimeout(controlsTimeout);
  controlsTimeout = setTimeout(() => {
    controls.classList.add('hidden');
  }, 4000); // Hide after 4 seconds
}

// Show controls when interacting with the video or controls
video.addEventListener('click', showControls);
controls.addEventListener('mousemove', showControls);

// Play/Pause functionality
playPauseButton.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    playPauseButton.textContent = '❚❚'; // Pause icon
  } else {
    video.pause();
    playPauseButton.textContent = '▶'; // Play icon
  }
});

// Update progress bar and time display
video.addEventListener('timeupdate', () => {
  const progress = (video.currentTime / video.duration) * 100;
  progressBar.value = progress;
  currentTimeDisplay.textContent = formatTime(video.currentTime);
});

// Set total time when video metadata is loaded
video.addEventListener('loadedmetadata', () => {
  totalTimeDisplay.textContent = formatTime(video.duration);
});

// Allow user to change video position by dragging the progress bar
progressBar.addEventListener('input', () => {
  const time = (progressBar.value / 100) * video.duration;
  video.currentTime = time;
  currentTimeDisplay.textContent = formatTime(time); // Update time display
});

// Skip forward/backward
skipBackButton.addEventListener('click', () => {
  video.currentTime -= 10;
});

skipForwardButton.addEventListener('click', () => {
  video.currentTime += 10;
});

// Volume control
volumeSlider.addEventListener('input', () => {
  video.volume = volumeSlider.value;
});

// Brightness control (using CSS filter)
brightnessSlider.addEventListener('input', () => {
  video.style.filter = `brightness(${brightnessSlider.value})`;
});



// Show loader when video is buffering
video.addEventListener('waiting', () => {
  loader.style.display = 'block';
});

video.addEventListener('playing', () => {
  loader.style.display = 'none';
});

// Helper function to format time (mm:ss)
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}