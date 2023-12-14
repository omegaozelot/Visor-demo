const ytdl = require('ytdl-core');
const fs = require('fs');

let upload = async (req, res) => {

	let URL = req.body.URL;
	res.header('Content-Disposition', 'attachment; filename="video.mp4"');
	// Test with https://www.youtube.com/watch?v=IoKZC7zfdEA
    let stream = ytdl(URL, {
        format: 'mp4'
    }).pipe(fs.createWriteStream('public/video.mp4'));
    stream.on('finish', async () => {
    	res.json({'video': 'video.mp4'});
    });

};

module.exports = { upload };