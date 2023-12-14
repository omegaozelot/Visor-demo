// const Imager = require ('../aws/image-recognition.js');

// let imager = new Imager();

let upload = async (req, res) => {

	// let results = await imager.uploadPromise(req.body);
	// results = JSON.parse(results.replaceAll("'", '"'));
	let results = {
		'predictions': ['without photo', 'without photo', 'without photo', 'without photo'],
		'probabilities': [67, 78, 82, 73]
	}
	res.json({'predictions': results.predictions, 'probabilities': results.probabilities});

};

module.exports = { upload };