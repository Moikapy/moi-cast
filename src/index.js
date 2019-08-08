// IMPORTS
import "./css/index.css";
import Core from "./core";

// VARIABLES
let Audio = false,
  Video = false,
  Desktop = false;
let audioChecked = false,
  videoChecked = false,
  desktopChecked = false;

const enableAudio = document.querySelector(".js-checkbox-audio");
const enableVideo = document.querySelector(".js-checkbox-video");
const enableDesktop = document.querySelector(".js-checkbox-desktop");

const enable = [enableAudio, enableVideo, enableDesktop];

// MEAT AND POTATOES
enableAudio.addEventListener("click", () => {
  let video = document.querySelector(".js-media-input");
  audioChecked = enableAudio.checked;
  if (audioChecked) {
    Audio = true;
    video.classList.remove("d-none");
    video.classList.add("d-block");
  } else {
    Audio = false;
    video.classList.remove("d-block");
    video.classList.add("d-none");
  }
});

enableVideo.addEventListener("click", () => {
  videoChecked = enableVideo.checked;
  if (videoChecked) {
    Video = {
      facingMode: "user",
      width: {
        min: 640,
        ideal: 1250,
        max: 1920
      },
      height: {
        min: 480,
        ideal: 720,
        max: 1080
      }
    };
  } else {
    Video = false;
  }
});

enableDesktop.addEventListener("click", () => {
  desktopChecked = enableDesktop.checked;
  if (desktopChecked) {
    Desktop = true;
    Video = true;
  } else {
    Desktop = false;
    Video = {
      facingMode: "user",
      width: {
        min: 640,
        ideal: 1250,
        max: 1920
      },
      height: {
        min: 480,
        ideal: 720,
        max: 1080
      }
    };
  }
});

enable.forEach(e => {
  e.addEventListener("change", () => {
    console.log(
      Audio,
      Video,
      Desktop,
      audioChecked,
      videoChecked,
      desktopChecked
    );

    if (!Audio == false || !Video == false) {
      Core(Audio, Video, Desktop);
    }
  });
});
