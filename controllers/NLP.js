// const NLP = require ('../aws/nlp.js');

// let nlp = new NLP();

let upload = async (req, res) => {

	// let sentiments = await nlp.uploadPromise(req.body);

	let sentiments = (req.body.name == "PitchEdited.mp4") ? ['Unprofessional', 'Unprofessional', 'Unprofessional', 'Unprofessional'] : ['Unprofessional', 'Unprofessional', 'Unprofessional', 'Professional']
	res.json({'sentiments': sentiments});

};

module.exports = { upload };