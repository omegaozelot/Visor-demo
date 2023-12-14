const dropContainer = document.getElementById('dropcontainer');
const uploadButton = document.getElementById('upload-button');
const curtain = document.getElementById('curtain');
const text = document.getElementById('question');

let modal = document.getElementById("modalBox");
let modalHead = document.getElementById("mlhead");
let modalBody = document.getElementById("mlbody");

// Modal closure
let span = document.getElementsByClassName("close")[0];
let modalHeader = document.getElementById("modalHeader");
let startButton = document.getElementById("startButton");

import WaveSurfer from 'https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js';
import chartOptions from './config/chart-options.js';
import polarChart from './config/polar-chart.js';

uploadButton.addEventListener("change", async (e) => {

	e.preventDefault();

	let reader = new FileReader();
	let file = e.target.files[0];

	reader.onload = video => { loadEverything(video, file); };

	curtain.style.bottom = "0%";
	question.style.top = '50%';

	reader.readAsDataURL(file);

});

let loadEverything = async (video, file) => {

	const data = {
		name: file.name,
		file: video.target.result.split(",")[1],
		'Content-Type': file.type,
	};

	const formData = new FormData();
	for (const name in data) formData.append(name, data[name]);

	const byteCharacters = atob(data.file);
	const byteNumbers = new Array(byteCharacters.length);
	for (let i = 0; i < byteCharacters.length; i++) {
	    byteNumbers[i] = byteCharacters.charCodeAt(i);
	};

	const byteArray = new Uint8Array(byteNumbers);
	const blob = new Blob([byteArray], {type: 'audio/wav'});

	const wavesurfer = WaveSurfer.create({
	  container: '#waveform',
	  waveColor: '#000000',
	  progressColor: '#FC903D',
	  height: 70,
	  barWidth: 2,
	  barGap: 3,
	});

	wavesurfer.loadBlob(blob);

	wavesurfer.on('interaction', () => {
	  wavesurfer.play();
	});

	let sendToBucket = new XMLHttpRequest();

	sendToBucket.open('POST', '/upload');
	sendToBucket.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

	let music = new Audio('../../music/Variation 1.wav');
	music.loop = true;
	music.play();

	sendToBucket.onload = async () => {

		music.pause();

		// DISPLAY EVERYTHING
		let summary = JSON.parse(sendToBucket.responseText);

		const dashboard = document.getElementsByClassName("dashboard");
		Array.prototype.forEach.call(dashboard, element => element.style.display = "flex");

		const summaryText = document.getElementById('summarytext');
		summaryText.innerHTML = summary.summary

		const logo = document.getElementById('logo');
		logo.style.display = "none";

		const headerText = document.getElementById('headertext');
		headerText.innerHTML = file.name.replace('.mp4', '');

		headerText.classList.remove('majorlong');

		const wrapper = document.getElementById('wrapper');
		wrapper.style.boxShadow = '0 2rem 4rem 0.25rem rgba(46, 43, 55, 0.575)';

		const tv = document.getElementById('tv');
		tv.innerHTML = `<video id="vid" controls><source id="src" type="video/mp4"></video>`;

		dropContainer.style.border = '2px dashed #555';

		const vid = document.getElementById('vid');
		const src = document.getElementById('src');

		src.setAttribute("src", video.target.result);
		vid.load();

		const tvWall = document.getElementById('tvwall');
		tvWall.setAttribute('style', 'width: auto');

		curtain.style.bottom = "100%"; // unveil

		let script = summary.transcript;

		script = script.split('. ').slice(0, 2).join('. ') + '. ' + script.split('. ').slice(-2).join('. ');

		// NUCLEAR REACTOR CORE. DO NOT TOUCH.
		let bulk = await Promise.all([
			new Promise((res, rej) => speechAnalysisCall(file.name, res, rej)), 
			new Promise((res, rej) => gazeEstimationCall(file.name, res, rej)), 
			new Promise((res, rej) => nlpCall(script, res, rej)),
			new Promise((res, rej) => businessValue(summary.transcript, res, rej)),
			new Promise((res, rej) => hume(file.name, res, rej)),
			new Promise((res, rej) => imageRecognition(file.name, res, rej))
		]);

		pdfGenerator(bulk, summary, file.name.replace('.mp4', ''));

	};

	sendToBucket.send(JSON.stringify(data));

};

let gazeEstimationCall = async (filename, res, rej) => {

	let sendToGazeEstimator = new XMLHttpRequest();

	sendToGazeEstimator.open('POST', '/gazeestimate');
	sendToGazeEstimator.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

	sendToGazeEstimator.onload = async () => {

		const ratio = JSON.parse(sendToGazeEstimator.responseText).ratio;
		const gazeText = document.getElementById('gaze');

		if (ratio == "-1") { gazeText.innerHTML = "No faces were detected, or the webcam footage is too dark."; } else { 

			let roundRatio = Math.round(parseFloat(ratio) * 100) / 100;
			gazeText.innerHTML = `The presenter faces the camera <u>${roundRatio}%</u> of the time.`; 

			gazeText.innerHTML += `\n<canvas id="axchart" style="margin-top:20px"></canvas>`;

			const indices = JSON.parse(sendToGazeEstimator.responseText).indices;
			const pitch = JSON.parse(sendToGazeEstimator.responseText).pitch;
			const yaw = JSON.parse(sendToGazeEstimator.responseText).yaw;

			const chartData = {
			  labels: indices,
			  datasets: [{ label: 'Pitch', data: pitch, borderColor: '#2C5545', backgroundColor: '#2C5545', yAxisID: 'y' },
			    { label: 'Yaw', data: yaw, borderColor: '#FC903D', backgroundColor: '#FC903D', yAxisID: 'y1' }]
			};

			const axChart = new Chart(document.getElementById("axchart"), chartOptions.options(chartData));
			return res(roundRatio);
			
		};

		return res(ratio);

	};

	const gazePayload = { name: filename };
	sendToGazeEstimator.send(JSON.stringify(gazePayload));

};

let speechAnalysisCall = async (filename, res, rej) => {

	let sendToSpeechAnalyser = new XMLHttpRequest();

	sendToSpeechAnalyser.open('POST', '/speechanalyse');
	sendToSpeechAnalyser.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

	sendToSpeechAnalyser.onload = async () => {

		const emotion = JSON.parse(sendToSpeechAnalyser.responseText);
		const emotionText = document.getElementById('emotion');

		let emotionTag = emotion.emotion.split(' — ')[0].toLowerCase();
		let description = emotion.emotion.split(' — ')[1];
		
		let height = (emotionTag == "strong") ? 14 : 12;
		let bot = (emotionTag == "strong") ? -2 : 0;

		emotionText.innerHTML = `<img id="emotiontag" src="../images/${emotionTag}.png" height="${height}" style="margin-top:12px"/>\n
		<u style="position:relative; top:${bot}px">${description}</u>`;

		return res([emotionTag, description]);

	};

	const speechPayload = { name: filename };
	sendToSpeechAnalyser.send(JSON.stringify(speechPayload));

};

let nlpCall = async (script, res, rej) => {

	let sendToNLP = new XMLHttpRequest();

	sendToNLP.open('POST', '/nlp');
	sendToNLP.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

	sendToNLP.onload = async () => {

		const sentiments = JSON.parse(sendToNLP.responseText).sentiments;
		const scriptStart = document.getElementById('nlp1');
		const scriptEnd = document.getElementById('nlp2');

		let sentences = script.split('. ');

		let palette = '';
		const iterateLine = (sentence, i) => {
			let underline = (sentiments[i] == 'Professional') ? 'red-underline' : 'green-underline';
			let fullstop =  (sentence.slice(-1) == '?') ? '' : '.';
			palette += `<span class="${underline}">${sentence}${fullstop} </span>`;
		};

		sentences.slice(0, 2).forEach(iterateLine);

		scriptStart.innerHTML = palette;

		palette = '';
		sentences.slice(-2).forEach(iterateLine);

		scriptEnd.innerHTML = palette;
		return res(sentiments);

	};

	const nlpPayload = { script: script };
	sendToNLP.send(JSON.stringify(nlpPayload));

};

let pdfGenerator = async (data, summary, filename) => {

	let sendToPDF = new XMLHttpRequest();

	sendToPDF.open('POST', '/pdf');
	sendToPDF.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

	sendToPDF.onload = async () => {

		const pdfButton = document.getElementById('pdf-button');
		const pdfLoading = document.getElementById('pdf-loading');
		pdfButton.style.display = "flex";
		pdfLoading.innerHTML = 'PDF generation complete!'

		pdfButton.addEventListener("click", downloader);
		pdfButton.filepath = 'images/visor.pdf';

	};

	const pdfPayload = { 
		emotion: data[0], 
		gazeRatio: data[1], 
		nlp: data[2],
		summary: summary.summary, 
		transcript: summary.transcript,
		filename: filename,
		businessValue: data[3],
		hume: data[4],
		imageRecognition: data[5]
	};

	sendToPDF.send(JSON.stringify(pdfPayload));

};

const downloader = async (e) => {

	let path = e.currentTarget.filepath;

   	let anchor = document.createElement('a');
	anchor.setAttribute('href', path);
	anchor.setAttribute('download', '');
	document.body.appendChild(anchor);
	anchor.click();
	anchor.parentNode.removeChild(anchor);

};

let businessValue = async (script, res, rej) => {

	let sendToGPT = new XMLHttpRequest();

	sendToGPT.open('POST', '/gpt');
	sendToGPT.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

	sendToGPT.onload = async () => {

		const response = JSON.parse(sendToGPT.responseText).text;
		const textbox = document.getElementById('business-value-text');
		textbox.innerHTML = response;

		return res(response);

	};

	const prompt = 'This is a transcript from a video of a student pitching their project. Tell me about its business value and critique it: ';
	const payload = { script: script, prompt: prompt };
	sendToGPT.send(JSON.stringify(payload));

};

let hume = async (videoName, res, rej) => {

	let sendToHume = new XMLHttpRequest();

	sendToHume.open('POST', '/hume');
	sendToHume.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

	sendToHume.onload = async () => {

		const response = JSON.parse(sendToHume.responseText);
		const voiceArea = document.getElementById('hume-text');
		const faceArea = document.getElementById('hume-face');

		const polarChartColours = [
			'#E0483D',
			'#FC903D',
			'#1D1E33',
			'#2C5545',
			'#57779A',
			'#C3A59F',
			'#242423'
		];

		const polarChartData = {
			labels: response.voice.emotions,
			datasets: [{ label: 'Prominence', data: response.voice.scores, backgroundColor: polarChartColours }]
		};

		const polarChartDataFace = {
			labels: response.face.emotions,
			datasets: [{ label: 'Prominence', data: response.face.scores, backgroundColor: polarChartColours }]
		};

		const polarChartConfig = {
			type: 'polarArea',
			data: polarChartData,
			options: polarChart.options()
		};

		const polarChartConfigFace = {
			type: 'polarArea',
			data: polarChartDataFace,
			options: polarChart.options()
		};

		voiceArea.innerHTML = `\n<canvas id="polarchart"></canvas>`;
		faceArea.innerHTML = `\n<canvas id="polarchartface"></canvas>`;
		const polarChartDisplay = new Chart(document.getElementById("polarchart"), polarChartConfig);
		const polarChartDisplayFace = new Chart(document.getElementById("polarchartface"), polarChartConfigFace);

		return res([response.voice.emotions[0], response.face.emotions[0]]);

	};

	const payload = { name: videoName };
	sendToHume.send(JSON.stringify(payload));

};

let imageRecognition = async (videoName, res, rej) => {

	let sendToIR = new XMLHttpRequest();
	sendToIR.open('POST', '/imagerecognition');
	sendToIR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

	sendToIR.onload = () => {

		const response = JSON.parse(sendToIR.responseText);
		const irText = document.getElementById('image-recognition-text');

		let output = "<ul>";

		const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

		let counter = 0;

		response.predictions.forEach((prediction, i) => {
			output += `<li>Frame ${i + 1} — ${capitalizeFirstLetter(prediction)} — P: ${response.probabilities[i]}%</li>`;
			if (prediction == 'with photo')
				counter++;
		});

		let percentage = counter / response.predictions.length;
		percentage = Math.round(percentage * 100);

		output += "</ul>";
		irText.innerHTML = output;

		return res(percentage);

	};

	const payload = { name: videoName };
	sendToIR.send(JSON.stringify(payload));

};

const youtubeLinkBox = document.getElementById('ytinput');

youtubeLinkBox.addEventListener("keydown", e => {
	let link = youtubeLinkBox.value.trim();
	if (e.key === 'Enter' && link != '') {
		validateLink(link);
	};
});

let validateLink = (link) => {

	if (link.startsWith("www.youtube.com/watch?v="))
		link = "https://" + link;
	else if (link.startsWith("youtube.com/watch?v="))
		link = "https://www." + link;

	if (!link.startsWith("https://www.youtube.com/watch?v=")) {

		modalHeader.innerHTML = 'Invalid link'
		startButton.value = 'OK';
  		modal.style.display = 'block';

	} else {

		startButton.link = link;

		modalHeader.innerHTML = 'Upload this video?'
		startButton.value = 'Yes';
  		modal.style.display = 'block';

	};

};

let uploadFromLink = async (request) => {
	let reader = new FileReader();
	let file = { name: 'video.mp4', type: 'video/mp4' };
  	reader.readAsDataURL(request);
  	reader.onload = e => {
  		console.log(e.target.result.split(",")[1])
 		// loadEverything(e, file);
  	};
};

let loadFile = async (filePath) => {

	fetch('video.mp4')
	  .then(res => res.blob()) // Gets the response and returns it as a blob
	  .then(blob => {
	  	console.log(blob)
	  	// uploadFromLink(blob);
	});

};

// Close modal
let closeModal = () => {
	modal.style.top = "600px";
	setTimeout(() => {
		modal.style.display = "none";
		modal.style.top = 0;
	}, 1000)
};

span.onclick = () => closeModal();

if (startButton) startButton.addEventListener('click', async (e) => {

	if (startButton.value == 'Yes') {

		closeModal();

		let sendToYTDL = new XMLHttpRequest();
		sendToYTDL.open('POST', '/ytdl');
		sendToYTDL.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

		sendToYTDL.onload = loadFile('video.mp4');

		const payload = { URL: e.currentTarget.link };
		sendToYTDL.send(JSON.stringify(payload));

		curtain.style.bottom = "0%";
		question.style.top = '50%';

	} else if (startButton.value == 'OK') {
		closeModal();
	};

});

const delay = time => { return new Promise (resolve => setTimeout (resolve, time)); };