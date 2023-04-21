import { captions } from "./captions.js";

console.log(captions);

const startButton = document.querySelector("main button");
const captionContainer = document.querySelector("main section div");
let caption = document.querySelector("main section div p");
const audio = document.querySelector("audio");
let pauseTime = 0;

startButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    startButton.classList.add("hidden");
    captionContainer.classList.add("start");
    console.log("start");
  } else {
    audio.pause();
    startButton.classList.remove("hidden");
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