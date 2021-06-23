// var video = document.getElementById('video')

														/* Image */
/*
Promise.all([
	faceapi.nets.tinyFaceDetector.loadFromUri('assets/models'),
	faceapi.nets.faceLandmark68Net.loadFromUri('assets/models'),
	faceapi.nets.faceRecognitionNet.loadFromUri('assets/models'),
	faceapi.nets.faceExpressionNet.loadFromUri('assets/models')
])
.then(processImage)


function processImage() {
	const canvas = faceapi.createCanvasFromMedia(video)

	const container = document.getElementById('container')

	console.dir(canvas)

	container.append(canvas)
	canvas.style.position = "absolute";

	const displaySize = { width: video.width, height: video.height }

	faceapi.matchDimensions(canvas, displaySize)

	setTimeout(async () => { // one time
		const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
		const resizedDetections = faceapi.resizeResults(detections, displaySize)
		canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

		faceapi.draw.drawDetections(canvas, resizedDetections)
		faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
		faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
	}, 100)
} 
*/



														/* Camera */
/*
														function setUp() {
	var video = document.getElementById('video')

	Promise.all([
		faceapi.nets.tinyFaceDetector.loadFromUri('assets/models'),
		faceapi.nets.faceLandmark68Net.loadFromUri('assets/models'),
		faceapi.nets.faceRecognitionNet.loadFromUri('assets/models'),
		faceapi.nets.faceExpressionNet.loadFromUri('assets/models')

	]).then(processImage)
}

function processImage() {
	var canvas = faceapi.createCanvasFromMedia(video)

	// var button = document.createElement("button");
	// button.innerHTML = "Do Something";

	var container = document.getElementById('container')
	var emotionsDiv = document.getElementById('emotions')

	console.dir(canvas)

	// container.append(canvas)
	// canvas.style.position = "absolute";
	// canvas.style.backgroundColor = "black";
	// canvas.style.color = "white"


	// var displaySize = { width: video.width, height: video.height }
	var displaySize = { width: video.width, height: video.height }


	// faceapi.matchDimensions(canvas, displaySize)

	setTimeout(async () => { // one time
		var detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions()
		var resizedDetections = faceapi.resizeResults(detections, displaySize)
		canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

		// console.dir(detections[0].expressions)
		// console.dir(resizedDetections[0].expressions)

		console.log("DET")
		console.dir(detections)


		// faceapi.draw.drawDetections(canvas, resizedDetections)
		// faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
		// faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

		console.log(detections[0].expressions)


		removeAllChildNodes(emotionsDiv)


		//If facial expression size is greater than 0 (facial expression detected) change the text in p
		if (resizedDetections && Object.keys(resizedDetections).length > 0) {
			const expressions = resizedDetections[0].expressions;
			console.log("EXP")
			console.dir(expressions)
				
			var emotions = [];
	
			for(var i = 0; i < 2; i++) {
				var emotion = Object.keys(expressions).reduce((a, b) => 
				expressions[a] > expressions[b] ? a : b
				);
				console.log("EMOTION " + emotion)

				emotions.push(emotion)

				// create the button object and add the text to it
				var button = document.createElement("BUTTON");
				button.innerHTML = emotion;

				// add the button to the div
				emotionsDiv.appendChild(button);

				delete expressions[emotion]; 
			}

			console.log("EMOTIONS ")
			console.dir(emotions)


			console.log("EMOTION " + emotion)
		}
	}, 100)
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
*/








													/* Select images */
function setUp() {
	Promise.all([
		faceapi.nets.tinyFaceDetector.loadFromUri('assets/models'),
		faceapi.nets.faceLandmark68Net.loadFromUri('assets/models'),
		faceapi.nets.faceRecognitionNet.loadFromUri('assets/models'),
		faceapi.nets.faceExpressionNet.loadFromUri('assets/models')

	]).then(processImage)
}

// Process image
function processImage() {
	var selectedImage = document.getElementById('selected-image')

	var emotionsDiv = document.getElementById('emotions')

	var displaySize = { width: selectedImage.width, height: selectedImage.height }

	setTimeout(async () => { // one time
		var detections = await faceapi.detectAllFaces(selectedImage, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions()
		var resizedDetections = faceapi.resizeResults(detections, displaySize)

		console.log("DET")
		console.dir(detections)
		console.log(detections[0].expressions)

		// Remove emotion buttons
		removeAllChildNodes(emotionsDiv)


		//If facial expression size is greater than 0 (facial expression detected) change the text in p
		if (resizedDetections && Object.keys(resizedDetections).length > 0) {
			const expressions = resizedDetections[0].expressions;
			console.log("EXP")
			console.dir(expressions)
			
			// Get top 3 emotinos
			//var emotions = [];
			// for(var i = 0; i < 2; i++) {
			// 	var emotion = Object.keys(expressions).reduce((a, b) => 
			// 	expressions[a] > expressions[b] ? a : b
			// 	);

			// 	emotions.push(emotion)

			// 	// create the button object and add the text to it
			// 	var button = document.createElement("BUTTON");
			// 	button.innerHTML = emotion;

			// 	// add the button to the div
			// 	emotionsDiv.appendChild(button);

			// 	delete expressions[emotion]; 
			// }


			// Get top emotion, and create similar emotions
			var emotion = Object.keys(expressions).reduce((a, b) => 
				expressions[a] > expressions[b] ? a : b
			);

			emotions = getEmotionsList(emotion)

			for(var i = 0; i < emotions.length; i++) {
				// create the button object and add the text to it
				var button = document.createElement("BUTTON");

				// button style
				button.classList.add("emotion");
				button.innerHTML = emotions[i];
				button.style.backgroundColor = "#79BCC1";
				button.style.color = "white";
				button.style.marginRight = "10px";
				button.style.border = "none";
				button.style.padding = "20px";
				button.style.fontWeight = "bold";
				button.style.fontSize = "1em"

				// add the button to the div
				emotionsDiv.appendChild(button);			
			}

			console.log("EMOTIONS")
			console.dir(emotions)
		}
	}, 100)
}

// Remove buttons
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Get emotions list based on main emotion
function getEmotionsList(emotion) {
	emotionsList = [emotion];

	switch(emotion) {
		case 'happy':
			emotionsList.push("cheerful", "excited")
			break;
		case 'sad':
			emotionsList.push("upset", "lonely")
			break;
		case 'angry':
			emotionsList.push("annoyed", "irritated")
			break;
		case 'surprised':
			emotionsList.push("shocked", "excited")
			break;
		case 'disgusted':
			emotionsList.push("repelled", "annoyed")
			break;
		case 'fearful':
			emotionsList.push("nervous", "alarmed")
			break;		
		default:
			break;
	}

	return emotionsList;
}