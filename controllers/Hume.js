// const Hume = require ('../aws/hume.js');

// let hume = new Hume();

let upload = async (req, res) => {

	/*
	let data = await hume.uploadPromise(req.body);
	data = JSON.parse(data.replaceAll("'", '"'));
	*/

	let voiceData = {'emotions': ['Interest', 'Doubt', 'Contemplation', 'Triumph', 'Tiredness', 'Calmness', 'Anxiety'], 'scores': [1, 0.5, 0.4, 0.35, 0.21, 0.13, 0.1]};
	let faceData = {'emotions': ['Distress', 'Doubt', 'Contemplation', 'Triumph', 'Tiredness', 'Sadness', 'Anxiety'], 'scores': [1, 0.9, 0.6, 0.5, 0.47, 0.33, 0.2]};
	let data = {'voice': voiceData, 'face': faceData};

	res.json({'voice': {'emotions': data.voice.emotions, 'scores': data.voice.scores}, 'face': {'emotions': data.face.emotions, 'scores': data.face.scores}});

};

module.exports = { upload };