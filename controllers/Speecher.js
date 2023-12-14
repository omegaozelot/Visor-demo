// const Speecher = require ('../aws/speech-analysis.js');

// let speecher = new Speecher();

let upload = async (req, res) => {

	// let emotion = await speecher.uploadPromise(req.body);
	let emotion = "Strong — The speaker has a clear, loud and expressive tone of voice."
	res.json({'emotion': emotion});

};

module.exports = { upload };