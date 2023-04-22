import { captions } from "./captions.js";

console.log(captions);

const startButton = document.querySelector("#startBtn");
const pauseIcon = document.querySelector("#startBtn>img");
const captionContainer = document.querySelector("main div");
const audio = document.querySelector("audio");
const currentTimeElement = document.querySelector("#currentTime");

var slider = document.querySelector("input[type=range]");

let caption = document.querySelector("main div p");
let pauseTime = 0;

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
  pauseTime = audio.currentTime;
  console.log("Pause time:", pauseTime);
  for (let i = 0; i < captions.length; i++) {
    if (pauseTime >= captions[i].time) {
      caption.innerHTML = captions[i].caption;
    }
  }
});

// Update the audio time based on the slider value
slider.oninput = function() {
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