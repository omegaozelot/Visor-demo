// const GazeEstimation = require ('../aws/gaze-estimation.js');

// let gazeEstimation = new GazeEstimation();

let upload = async (req, res) => {

	// let data = await gazeEstimation.uploadPromise(req.body);
	let data = {
		'ratio': 72,
		'indices': [0,1,2,3,4,5,6,7,8,9,10],
		'pitch': [-18,-40,-25,-10,-12,-13,-14,-42,-46,-32],
		'yaw': [-12,-32,-20,-15,-16,-17,-22,-22,-30,-12]
	}
	res.json({'ratio': data.ratio, 'indices': data.indices, 'pitch': data.pitch, 'yaw': data.yaw});

};

module.exports = { upload };