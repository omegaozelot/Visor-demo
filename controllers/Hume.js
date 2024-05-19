// const Hume = require ('../aws/hume.js');

// let hume = new Hume();

let upload = async (req, res) => {

	/*
	let data = await hume.uploadPromise(req.body);
	data = JSON.parse(data.replaceAll("'", '"'));
	*/

	let voiceData = (req.body.name == "PitchEdited.mp4") ? {'emotions': ['Calmness', 'Doubt', 'Contemplation', 'Triumph', 'Tiredness', 'Concentration', 'Anxiety'], 'scores': [0.6, 0.5, 0.4, 0.35, 0.21, 0.13, 0.1]} : {'emotions': ['Interest', 'Anxiety', 'Excitement', 'Triumph', 'Contempt', 'Anger', 'Determination'], 'scores': [0.783, 0.680, 0.642, 0.523, 0.491, 0.331, 0.312]};
	let faceData = (req.body.name == "PitchEdited.mp4") ? {'emotions': ['Concentration', 'Calmness', 'Boredom', 'Confusion', 'Interest', 'Doubt', 'Disappointment'], 'scores': [0.609, 0.608, 0.556, 0.385, 0.336, 0.334, 0.306]} : {'emotions': ['Calmness', 'Boredom', 'Concentration', 'Tiredness', 'Confusion', 'Disappointment', 'Doubt'], 'scores': [0.655, 0.608, 0.521, 0.378, 0.371, 0.344, 0.327]};

	let data = {'voice': voiceData, 'face': faceData};

	res.json({'voice': {'emotions': data.voice.emotions, 'scores': data.voice.scores}, 'face': {'emotions': data.face.emotions, 'scores': data.face.scores}});

};

module.exports = { upload };