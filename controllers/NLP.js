// const NLP = require ('../aws/nlp.js');

// let nlp = new NLP();

let upload = async (req, res) => {

	// let sentiments = await nlp.uploadPromise(req.body);
	let sentiments = ['Unprofessional', 'Unprofessional', 'Unprofessional', 'Professional']
	res.json({'sentiments': sentiments});

};

module.exports = { upload };