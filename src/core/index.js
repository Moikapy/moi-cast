import { isOldBrowser, isOldBrowserDesktop } from "../util/isOldBrowser";
const Core = (audio, video, desktop) => {
  let isDesktop = desktop;

  let constraintObj = {
    audio: audio,
    video: video
  };

  if (!isDesktop) {
    isOldBrowser();
    navigator.mediaDevices
      .getUserMedia(constraintObj)
      .then(mediaStreamObj => {
        //connect the media stream to the first video element
        let video = document.querySelector("video");
        if ("srcObject" in video) {
          video.srcObject = mediaStreamObj;
        } else {
          //old version
          video.src = window.URL.createObjectURL(mediaStreamObj);
        }

        video.onloadedmetadata = ev => {
          //show in the video element what is being captured by the webcam
          video.play();
        };

        //add listeners for saving video/audio
        let start = document.querySelector("js-record");
        let stop = document.querySelector("js-stop");
        let vidSave = document.querySelector("js-video");
        let mediaRecorder = new MediaRecorder(mediaStreamObj);
        let chunks = [];

        start.addEventListener("click", ev => {
          mediaRecorder.start();
          mediaRecorder.state;
        });
        stop.addEventListener("click", ev => {
          mediaRecorder.stop();
          cmediaRecorder.state;
        });
        mediaRecorder.ondataavailable = ev => {
          chunks.push(ev.data);
        };
        mediaRecorder.onstop = ev => {
          let blob = new Blob(chunks, {
            type: "video/mp4;"
          });
          chunks = [];
          let videoURL = window.URL.createObjectURL(blob);
          vidSave.src = videoURL;
        };
      })
      .catch(err => {
        console.log(err.name, err.message);
      });
  } else {
    isOldBrowserDesktop();
    navigator.mediaDevices
      .getDisplayMedia(constraintObj)
      .then(mediaStreamObj => {
        //connect the media stream to the first video element
        let video = document.querySelector(".js-media-input");
        if ("srcObject" in video) {
          video.srcObject = mediaStreamObj;
        } else {
          //old version
          video.src = window.URL.createObjectURL(mediaStreamObj);
        }

        video.onloadedmetadata = ev => {
          //show in the video element what is being captured by the webcam
          video.play();
        };

        //add listeners for saving video/audio
        let start = document.querySelector("js-record");
        let stop = document.querySelector("js-stop");
        let vidSave = document.querySelector("js-video");
        let mediaRecorder = new MediaRecorder(mediaStreamObj);
        let chunks = [];

        start.addEventListener("click", ev => {
          mediaRecorder.start();
          mediaRecorder.state;
        });
        stop.addEventListener("click", ev => {
          mediaRecorder.stop();
          mediaRecorder.state;
        });
        mediaRecorder.ondataavailable = ev => {
          chunks.push(ev.data);
        };
        mediaRecorder.onstop = ev => {
          let blob = new Blob(chunks, {
            type: "video/mp4;"
          });
          chunks = [];
          let videoURL = window.URL.createObjectURL(blob);
          vidSave.src = videoURL;
        };
      })
      .catch(err => {
        console.log(err.name, err.message);
      });
  }
};

export default Core;
