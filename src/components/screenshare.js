import {
	isOldBrowser,
	isOldBrowserDesktop
} from '../util/isOldBrowser';
const ScreenShare = async (audio, video, config) => {
	try {
		let constraintObj = {
			audio: true,
			video: config
		};

		isOldBrowserDesktop(constraintObj);
		navigator.mediaDevices
			.getDisplayMedia(constraintObj)
			.then((mediaStreamObj) => {
				//connect the media stream to the first video element
				let video = document.querySelector('.js-media-input');
				if ('srcObject' in video) {
					video.srcObject = mediaStreamObj + '.mp4';
				} else {
					//old version
					video.src = window.URL.createObjectURL(mediaStreamObj) + '.mp4';
				}

				video.onloadedmetadata = (ev) => {
					//show in the video element what is being captured by the webcam
					video.defaultMuted = true;
					setTimeout(() => {
						video.play();
					}, 100);
				};

				//add listeners for saving video/audio
				let start = document.querySelector('.js-record');
				let stop = document.querySelector('.js-stop');
				let vidSave = document.querySelector('.js-video');
				let mediaRecorder = new MediaRecorder(mediaStreamObj);
				let chunks = [];

				start.addEventListener('click', (ev) => {
					try {
						mediaRecorder.start();
						mediaRecorder.state;
					} catch (e) {
						console.log(e);
					}
				});
				stop.addEventListener('click', (ev) => {
					try {
						mediaRecorder.stop();
						mediaRecorder.state;
					} catch (e) {
						console.log(e);
					}
				});
				mediaRecorder.ondataavailable = (ev) => {
					chunks.push(ev.data);
				};
				mediaRecorder.onstop = (ev) => {
					let blob = new Blob(chunks, {
						type: 'video/mp4;'
					});
					chunks = [];
					let videoURL = window.URL.createObjectURL(blob);
					vidSave.src = videoURL + '.mp4';
				};
			})
			.catch((err) => {
				console.log(err.name, err.message);
			});

	} catch (e) {
		console.log(e);
	}
};

export default ScreenShare;