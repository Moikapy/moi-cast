const Core = (desktop,audio,video)=>{
let isDesktop = desktop;

let constraintObj = {
	audio: audio,
	video: video
};


if (!isDesktop) {

  //handle older browsers that might implement getUserMedia in some way
if (navigator.mediaDevices === undefined) {
	navigator.mediaDevices = {};
	navigator.mediaDevices.getUserMedia = function(constraintObj) {
		let getUserMedia =
			navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
		if (!getUserMedia) {
			return Promise.reject(
				new Error('getUserMedia is not implemented in this browser')
			);
		}
		return new Promise(function(resolve, reject) {
			getUserMedia.call(navigator, constraintObj, resolve, reject);
		});
	};
} else {
	navigator.mediaDevices
		.enumerateDevices()
		.then(devices => {
			devices.forEach(device => {
				console.log(device.kind.toUpperCase(), device.label);
				//, device.deviceId
			});
		})
		.catch(err => {
			console.log(err.name, err.message);
		});
}

	navigator.mediaDevices
		.getUserMedia(constraintObj)
		.then(function(mediaStreamObj) {
			//connect the media stream to the first video element
			let video = document.querySelector('video');
			if ('srcObject' in video) {
				video.srcObject = mediaStreamObj;
			} else {
				//old version
				video.src = window.URL.createObjectURL(mediaStreamObj);
			}

			video.onloadedmetadata = function(ev) {
				//show in the video element what is being captured by the webcam
				video.play();
			};

			//add listeners for saving video/audio
			let start = document.getElementsByClassName('js-record')[0];
			let stop = document.getElementsByClassName('js-stop')[0];
			let vidSave = document.getElementsByClassName('js-video')[0];
			let mediaRecorder = new MediaRecorder(mediaStreamObj);
			let chunks = [];

			start.addEventListener('click', ev => {
				mediaRecorder.start();
				console.log(mediaRecorder.state);
			});
			stop.addEventListener('click', ev => {
				mediaRecorder.stop();
				console.log(mediaRecorder.state);
			});
			mediaRecorder.ondataavailable = function(ev) {
				chunks.push(ev.data);
			};
			mediaRecorder.onstop = ev => {
				let blob = new Blob(chunks, { type: 'video/mp4;' });
				chunks = [];
				let videoURL = window.URL.createObjectURL(blob);
				vidSave.src = videoURL;
			};
		})
		.catch(function(err) {
			console.log(err.name, err.message);
		});
} else {

  //handle older browsers that might implement getUserMedia in some way
if (navigator.mediaDevices === undefined) {
	navigator.mediaDevices = {};
	navigator.mediaDevices.getDisplayMedia = function(constraintObj) {
		let getUserMedia =
			navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
		if (!getUserMedia) {
			return Promise.reject(
				new Error('getUserMedia is not implemented in this browser')
			);
		}
		return new Promise(function(resolve, reject) {
			getUserMedia.call(navigator, constraintObj, resolve, reject);
		});
	};
} else {
	navigator.mediaDevices
		.enumerateDevices()
		.then(devices => {
			devices.forEach(device => {
				console.log(device.kind.toUpperCase(), device.label);
				//, device.deviceId
			});
		})
		.catch(err => {
			console.log(err.name, err.message);
		});
}


	navigator.mediaDevices
		.getDisplayMedia(constraintObj)
		.then(function(mediaStreamObj) {
			//connect the media stream to the first video element
			let video = document.querySelector('video');
			if ('srcObject' in video) {
				video.srcObject = mediaStreamObj;
			} else {
				//old version
				video.src = window.URL.createObjectURL(mediaStreamObj);
			}

			video.onloadedmetadata = function(ev) {
				//show in the video element what is being captured by the webcam
				video.play();
			};

			//add listeners for saving video/audio
			let start = document.getElementsByClassName('js-record')[0];
			let stop = document.getElementsByClassName('js-stop')[0];
			let vidSave = document.getElementsByClassName('js-video')[0];
			let mediaRecorder = new MediaRecorder(mediaStreamObj);
			let chunks = [];

			start.addEventListener('click', ev => {
				mediaRecorder.start();
				console.log(mediaRecorder.state);
			});
			stop.addEventListener('click', ev => {
				mediaRecorder.stop();
				console.log(mediaRecorder.state);
			});
			mediaRecorder.ondataavailable = function(ev) {
				chunks.push(ev.data);
			};
			mediaRecorder.onstop = ev => {
				let blob = new Blob(chunks, { type: 'video/mp4;' });
				chunks = [];
				let videoURL = window.URL.createObjectURL(blob);
				vidSave.src = videoURL;
			};
		})
		.catch(function(err) {
			console.log(err.name, err.message);
		});
}

}

export default Core