const PDF = require ('../pdf/pdf.js');

let pdf = new PDF();

let upload = async (req, res) => {

	let filename = await pdf.uploadPromise(req.body);
	res.json({'filename': filename});

};

module.exports = { upload };