import { isOldBrowser } from '../util/isOldBrowser';
export default class Audio {
	init() {
		isOldBrowser({ audio: true });
		navigator.mediaDevices
			.getUserMedia({ audio: true })
			.then((mediaStreamObj) => {
				//add listeners for saving video/audio
				let start = document.querySelector('.js-record');
				let stop = document.querySelector('.js-stop');
				let audioSave = document.querySelector('.js-audio');
				let mediaRecorder = new MediaRecorder(mediaStreamObj);
				let chunks = [];

				start.addEventListener('click', async (ev) => {
					try {
						mediaRecorder.start();
						mediaRecorder.state;
					} catch (e) {
						console.log(e);
					}
				});
				stop.addEventListener('click', async (ev) => {
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
						type: 'audio/mpeg;'
					});
					chunks = [];
					let audioURL = window.URL.createObjectURL(blob);
					audioSave.src = audioURL;
				};
			})
			.catch((err) => {
				console.log(err.name, err.message);
			});
	}
}
