import {
	Audio,
	ScreenShare,
	WebCam
} from './components';


export default class App {
	init() {
		// VARIABLES
		let isAudio = false,
			Video = false,
			Desktop = false;
		let audioChecked = false,
			videoChecked = false,
			desktopChecked = false;

		let audioEl = document.querySelector('.js-audio-container');
		let video = document.querySelector('.js-media-container');
		const enablePodcast = document.querySelector('.js-checkbox-audio');
		const enableVideo = document.querySelector('.js-checkbox-video');
		const enableDesktop = document.querySelector('.js-checkbox-desktop');

		// MEAT AND POTATOES
		enablePodcast.addEventListener('click', () => {
			audioChecked = enablePodcast.checked;
			if (audioChecked) {
				isAudio = true;
				Video = false;
				Audio()
				enableVideo.checked = false;
				video.classList.add('d-none');
				audioEl.classList.remove('d-none');
			} else {
				audioEl.classList.add('d-none');
				isAudio = false;
			}
		});

		enableVideo.addEventListener('click', () => {
			videoChecked = enableVideo.checked;
			if (videoChecked) {
				enablePodcast.checked = false;
				audioEl.classList.add('d-none');
				video.classList.remove('d-none');
				Video = {
					facingMode: 'user',
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
				}
				WebCam(Video)
			} else {
				audioEl.classList.add('d-none');
				video.classList.add('d-none');
				isAudio = false;
				Video = false;
				enableVideo.checked = false;
			}
		});

		enableDesktop.addEventListener('click', () => {
			videoChecked = enableVideo.checked;
			if (desktopChecked) {
				Desktop = true;
				Video = true;
				ScreenShare(Video)
			} else {
				Desktop = false;
			}
		});
	}
}
