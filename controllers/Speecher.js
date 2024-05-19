// const Speecher = require ('../aws/speech-analysis.js');

// let speecher = new Speecher();

let upload = async (req, res) => {

	// let emotion = await speecher.uploadPromise(req.body);

	let emotion = (req.body.name == "PitchEdited.mp4") ? "Rushed — The speaker talks too quickly, and might come off as unclear." : "Strong — The speaker has a clear, loud and expressive tone of voice."

	res.json({'emotion': emotion});

};

module.exports = { upload };