import { captions } from "./captions.js";

console.log(captions);

const startButton = document.querySelector("#startBtn");
const pauseIcon = document.querySelector("#startBtn>img");
const captionContainer = document.querySelector("main div");
let caption = document.querySelector("main div p");
const audio = document.querySelector("audio");
let pauseTime = 0;

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

audio.addEventListener("timeupdate", () => {
  pauseTime = audio.currentTime;
  console.log("Pause time:", pauseTime);
  for (let i = 0; i < captions.length; i++) {
    if (pauseTime >= captions[i].time) {
      caption.innerHTML = captions[i].caption;
    }
  }
});