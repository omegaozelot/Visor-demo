module.exports = function (app) {

	let uploader = require('./controllers/Uploader.js');
	let speechAnalysis = require('./controllers/Speecher.js');
	let gazeEstimation = require('./controllers/Gaze.js');
	let nlp = require('./controllers/NLP.js');
	let pdf = require('./controllers/PDF.js');
	let gpt = require('./controllers/GPT.js');
	let hume = require('./controllers/Hume.js');
	let ytdl = require('./controllers/YTDL.js');
	let imageRecognition = require('./controllers/Imager.js');

	app.route('/upload').post(uploader.upload);
	app.route('/speechanalyse').post(speechAnalysis.upload);
	app.route('/gazeestimate').post(gazeEstimation.upload);
	app.route('/nlp').post(nlp.upload);
	app.route('/pdf').post(pdf.upload);
	// app.route('/gpt').post(gpt.askGPT);
	app.route('/hume').post(hume.upload);
	app.route('/ytdl').post(ytdl.upload);
	app.route('/imagerecognition').post(imageRecognition.upload);
	
}