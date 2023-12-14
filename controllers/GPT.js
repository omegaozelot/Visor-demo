// const GPT = require ('../aws/gpt-3.js');

// let gpt = new GPT();

let askGPT = async (req, res) => {

	let text = await gpt.uploadPromise(req.body);
	res.json({'text': text});

};

module.exports = { askGPT };