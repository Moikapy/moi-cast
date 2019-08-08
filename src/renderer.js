import './css/index.css';

import Core from './core'

let Audio,Video,Desktop;

let enableAudio = document.querySelector('.js-checkbox-audio')
enableAudio.addEventListener('click',()=>{
	let audioChecked = enableAudio.checked
	if(audioChecked){
		Audio = true
	}else{
		Audio = false
	}
})

let enableVideo = document.querySelector('.js-checkbox-video')
enableVideo.addEventListener('click',()=>{
	let videoChecked = enableVideo.checked
	if(videoChecked){
		Video = {
			facingMode: 'user',
			width: { min: 640, ideal: 1250, max: 1920 },
			height: { min: 480, ideal: 720, max: 1080 }
		}
	} else {
		Video = false
	}
})

let enableDesktop = document.querySelector('.js-checkbox-desktop')
enableDesktop.addEventListener('click',()=>{
	let desktopChecked = enableDesktop.checked
	if(desktopChecked){
		Desktop = true
	}else{
		Desktop = false
	}
})

if (!Audio == false && !Video == false){
}
console.log(Desktop,Audio,Video)
Core(Desktop,Audio,Video)