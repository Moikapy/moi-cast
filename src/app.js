import Core from './core';
import Audio from './core/audio'
let audio = new Audio


export default class App {
	init() {
    // VARIABLES
		let Audio = false,
    Video = false,
    Desktop = false;
		let audioChecked = false,
    videoChecked = false,
    desktopChecked = false;
    
    let audioEl = document.querySelector('.js-audio-container')
		let video = document.querySelector('.js-media-container');
		const enablePodcast = document.querySelector('.js-checkbox-audio');
		const enableVideo = document.querySelector('.js-checkbox-video');
		const enableDesktop = document.querySelector('.js-checkbox-desktop');
    
		const enable = [ enableVideo, enableDesktop ];
    
		// MEAT AND POTATOES
		enablePodcast.addEventListener('click', () => {
      audioChecked = enablePodcast.checked;
			if (audioChecked) {
        Audio = true;
        Video = false;
        audio.init()
        enableVideo.checked = false
        video.classList.add('d-none');
        audioEl.classList.remove('d-none');
			} else {
        audioEl.classList.add('d-none');
        Audio = false;
			}
		});

		enableVideo.addEventListener('click', () => {
			videoChecked = enableVideo.checked;
			if (videoChecked) {
        enablePodcast.checked = false
        audioEl.classList.add('d-none');
        video.classList.remove('d-none');
        Audio = true
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
				};
			} else {
        audioEl.classList.add('d-none');
        video.classList.add('d-none');
        Audio = false;
        Video = false;
        enableVideo.checked = false
			}
		});

		enableDesktop.addEventListener('click', () => {
			videoChecked = enableVideo.checked;
			if (desktopChecked) {
				Desktop = true;
				Video = true;
			} else {
				Desktop = false;
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
				};
			}
		});

		enable.forEach(async (e) => {
			e.addEventListener('change', () => {
        try {
					Core(Audio, Video, Desktop);
				} catch (e) {
					console.log(e);
				}
			});
		});
	}
}
