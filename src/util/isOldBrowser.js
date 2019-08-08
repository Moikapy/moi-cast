const isOldBrowser = () => {
	//handle older browsers that might implement getUserMedia in some way
	if (navigator.mediaDevices === undefined) {
		navigator.mediaDevices = {};
		navigator.mediaDevices.getUserMedia = (constraintObj) => {
			let getUserMedia =
				navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
			if (!getUserMedia) {
				return Promise.reject(
					new Error('getUserMedia is not implemented in this browser')
				);
			}
			return new Promise((resolve, reject) => {
				getUserMedia.call(navigator, constraintObj, resolve, reject);
			});
		};
	} else {
		navigator.mediaDevices
			.enumerateDevices()
			.then(devices => {
				devices.forEach(device => {
					device.kind.toUpperCase()
					device.label
					device.deviceId
				});
			})
			.catch(err => {
				console.log(err.name, err.message);
			});
	}

}

const isOldBrowserDesktop = () => {
	//handle older browsers that might implement getUserMedia in some way
	if (navigator.mediaDevices === undefined) {
		navigator.mediaDevices = {};
		navigator.mediaDevices.getDisplayMedia = (constraintObj) => {
			let getUserMedia =
				navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
			if (!getUserMedia) {
				return Promise.reject(
					new Error("getDisplayMedia is not implemented in this browser")
				);
			}
			return new Promise((resolve, reject) => {
				getUserMedia.call(navigator, constraintObj, resolve, reject);
			});
		};
	} else {
		navigator.mediaDevices
			.enumerateDevices()
			.then(devices => {
				devices.forEach(device => {
					device.kind.toUpperCase()
					device.label
					device.deviceId
				});
			})
			.catch(err => {
				console.log(err.name, err.message);
			});
	}


}

export {
	isOldBrowser,
	isOldBrowserDesktop
}
