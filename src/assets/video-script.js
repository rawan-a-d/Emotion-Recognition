															/* Video */



// video.play();


// function setUpVideo() {



// }
var video = document.getElementById('video')

// if(video != null) {

// console.dir(video)

// console.log("SET UP VIDEO")



// }

Promise.all([
	faceapi.nets.tinyFaceDetector.loadFromUri('assets/models'),
	faceapi.nets.faceLandmark68Net.loadFromUri('assets/models'),
	faceapi.nets.faceRecognitionNet.loadFromUri('assets/models'),
	faceapi.nets.faceExpressionNet.loadFromUri('assets/models')
])
.then(startVideo)

video.addEventListener('play', () => {
	const canvas = faceapi.createCanvasFromMedia(video)

	const container = document.getElementById('container')

	console.dir(canvas)

	container.append(canvas)
	canvas.style.position = "absolute";

	const displaySize = { width: video.width, height: video.height }

	faceapi.matchDimensions(canvas, displaySize)

	setInterval(async () => { // repeated
		const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
		const resizedDetections = faceapi.resizeResults(detections, displaySize)
		canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

		faceapi.draw.drawDetections(canvas, resizedDetections)
		faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
		faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
	}, 100)
})


function startVideo() {
	navigator.getUserMedia(
		{ video: {} },
		stream => video.srcObject = stream,
		err => console.error(err)
	)
}