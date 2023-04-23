import { captions } from "./captions.js";

console.log(captions);

const startButton = document.querySelector("#startBtn");
const pauseIcon = document.querySelector("#startBtn>img");
const captionContainer = document.querySelector("main div");
const audio = document.querySelector("audio");
const currentTimeElement = document.querySelector("#currentTime");
const speedSelector = document.querySelector("select");
const rewindButton = document.querySelector("#rewindBtn");
const fastForwardButton = document.querySelector("#fastforwardBtn");


var slider = document.querySelector("input[type=range]");

let caption = document.querySelector("main div p");
let currentTime = 0;

// Play or pause the audio
startButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    captionContainer.classList.add("start");
    pauseIcon.src = "images/pause-icon.svg";
    pauseIcon.classList.add("pauseIcon");
    console.log("start");
  } else {
    audio.pause();
    pauseIcon.src = "images/play-icon.svg";
    pauseIcon.classList.remove("pauseIcon");
    console.log("pause");
  }
});

// Show the caption based on the audio time
audio.addEventListener("timeupdate", () => {
  const totalTime = audio.duration;
  const percentage = (currentTime / totalTime) * 100;
  currentTime = audio.currentTime;

  slider.value = percentage;

  for (let i = 0; i < captions.length; i++) {
    if (currentTime >= captions[i].time) {
      caption.innerHTML = captions[i].caption;
    }
  }
});

// Update the audio time based on the slider value
slider.oninput = function () {
  audio.currentTime = (audio.duration / 100) * this.value;
};


// Update the current time display
function updateCurrentTime() {
  const currentTime = audio.currentTime;
  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  currentTimeElement.textContent = formattedTime;
}

// Update the time display every second
setInterval(updateCurrentTime, 1000);

// Audio speed
speedSelector.addEventListener("change", () => {
  const selectedSpeed = speedSelector.value;

  if (selectedSpeed === "0.75x") {
    audio.playbackRate = 0.75;
  } else if (selectedSpeed === "1x") {
    audio.playbackRate = 1.0;
  } else if (selectedSpeed === "1.25x") {
    audio.playbackRate = 1.25;
  } else if (selectedSpeed === "1.5x") {
    audio.playbackRate = 1.5;
  }
});


// Rewind and fast forward the audio
rewindButton.addEventListener("click", () => {
  audio.currentTime -= 15;
});

fastForwardButton.addEventListener("click", () => {
  audio.currentTime += 15;
});


const vibrateButton = document.querySelector('#vibrateBtn');
const messageElement = document.querySelector('#message');


vibrateButton.addEventListener('click', () => {
  const pattern = [100, 100, 100]; // vibration pattern
  if ("vibrate" in navigator) {
    messageElement.textContent = "Vibration is supported in your browser";
    navigator.vibrate(pattern); // trigger vibration
  } else {
    messageElement.textContent = "Vibration is not supported in your browser";
  }
});

