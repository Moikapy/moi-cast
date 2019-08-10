import {
	isOldBrowser
} from '../util/isOldBrowser';

import MoiFileSave from './fileSave'

const Audio = async () => {
	let audioURL,
		exportAudio;
	isOldBrowser({
		audio: true
	});
	navigator.mediaDevices
		.getUserMedia({
			audio: true
		})
		.then((mediaStreamObj) => {
			//add listeners for saving video/audio
			let start = document.querySelector('.js-record');
			let stop = document.querySelector('.js-stop');
			let audioSave = document.querySelector('.js-audio');
			let mediaExport = document.querySelector('.js-export');

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
			mediaExport.addEventListener('click', async (e) => {
				e.preventDefault()
				try {
					if (exportAudio !== undefined) {
						MoiFileSave(exportAudio, `moicast_audio${Math.floor(Math.random() * 10000)}.mp3`)
					}
				} catch (e) {
					console.log(e)
				}
			})
			mediaRecorder.ondataavailable = (ev) => {
				chunks.push(ev.data);
			};
			mediaRecorder.onstop = (ev) => {
				let blob = new Blob(chunks, {
					type: 'audio/mpeg;'
				});
				chunks = [];
				audioURL = window.URL.createObjectURL(blob);
				audioSave.src = audioURL;
				exportAudio = audioURL
			};
		})
		.catch((err) => {
			console.log(err.name, err.message);
		});
}

export default Audio
