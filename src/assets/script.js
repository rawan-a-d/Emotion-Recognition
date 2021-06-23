
														/* Camera */
function setUpCamera() {
	var video = document.getElementById('video')

	Promise.all([
		faceapi.nets.tinyFaceDetector.loadFromUri('assets/models'),
		faceapi.nets.faceLandmark68Net.loadFromUri('assets/models'),
		faceapi.nets.faceRecognitionNet.loadFromUri('assets/models'),
		faceapi.nets.faceExpressionNet.loadFromUri('assets/models')

	]).then(processImage)
}



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