const fs = require('fs');
const PDFDocument = require('pdfkit');

// Create a PDF document
const doc = new PDFDocument();

class PDF {

    uploadPromise(data) { return new Promise((resolve, reject) => this.upload(data, resolve, reject)); };

    upload(data, resolve, reject) {

        // Pipe the PDF document to a writable stream
        doc.pipe(fs.createWriteStream('public/images/visor.pdf'));

        // Define function to add content with given formatting
        function addFormattedContent(title, content, options = {}) {
            doc.font('Helvetica-Bold').fontSize(options.titleSize || 25).text(title, options.titleX || 50, doc.y);
            doc.moveDown(0.5);
            
            doc.font('Helvetica-Bold').fontSize(options.subtitleSize || 16).text(content.subtitle, options.subtitleX || 50, doc.y);
            doc.moveDown(0.5);
            
            doc.font('Helvetica').fontSize(options.textSize || 12).text(content.text, options.textX || 50, doc.y);
            
            if (content.details) {
                doc.moveDown(0.5);
                for (const detail of content.details) {
                    doc.font('Helvetica-Bold').text(detail.title, options.detailTitleX || 70, doc.y);
                    doc.font('Helvetica').text(detail.text, options.detailTextX || 100, doc.y);
                    doc.moveDown(0.5);
                }
            }
            
            doc.moveDown(1);
        }

        let summ = data.summary;
        if (typeof summ === 'string' || summ instanceof String)
            summ = summ.replaceAll('\n', '');

        let bidness = data.businessValue;
        if (typeof bidness === 'string' || bidness instanceof String)
            bidness = bidness.replaceAll('\n', '');

        // Define the content
        const content = [
            {
                title: 'VISOR REPORT | ' + data.filename,
            },
            {     
                title: 'Summary',
                text: summ,
            },
            {
                title: 'Speech Analysis',
                subtitle: this.capitalizeFirstLetter(data.emotion[0]),
                text: data.emotion[1],
                details: [
                    { title: 'Enthusiasm — ' + this.calculateEnthusiasm(data)[0] },
                    { title: 'Clarity — '  + this.calculateEnthusiasm(data)[1] }
                ]
            },
            {
                title: 'Text Analysis',
                text: this.calculateProfessionalism(data)[1],
                details: [
                    { title: 'Professionalism — ' + this.calculateProfessionalism(data)[0] }
                ]
            },
            {
                title: 'Gaze Estimation',
                text: this.calculateEyeContact(data),
                details: [
                    { title: 'Eye contact — ' + ((data.gazeRatio == "-1") ? "0" : data.gazeRatio) + '%' }
                ]
            },
            {
                title: 'Business Value',
                text: bidness
            },
            {
                title: 'Hume Emotion Details',
                text: "Here's what we found.",
                details: [
                    { title: 'Dominant vocal emotion — ' + data.hume[0] },
                    { title: 'Dominant facial emotion — ' + data.hume[1] },
                ]
            },
            {
                title: 'Slide Images',
                text: 'Does the presenter have slides with images?',
                details: [
                    { title: '% of slides with images — ' + data.imageRecognition }
                ]
            }
        ];

        // Add content to the PDF
        for (const item of content) {
            addFormattedContent(item.title, {
                subtitle: item.subtitle,
                text: item.text,
                details: item.details
            });
        }
        // Add a new page
        doc.addPage();

        // Define the content for the second page
        const contentPage2 = [
            {
                title: 'Transcript',
                text: data.transcript,
            }
        ];

        // Add content for the second page
        for (const item of contentPage2) {
            addFormattedContent(item.title, {
                subtitle: item.subtitle,
                text: item.text
            });
        }

        // Finalize the PDF
        doc.end();

        resolve('visor.pdf');

    };

    calculateEnthusiasm(data) {

        let enthusiasm = 0;
        let clarity = 0;
        switch(data.emotion[0]) {

            case 'strong':
                enthusiasm = 4;
                clarity = 3;
                break;
            case 'disinterested':
                enthusiasm = 2;
                clarity = 4;
                break;
            case 'rushed':
                enthusiasm = 3;
                clarity = 2;
                break;
            case 'enthusiastic':
                enthusiasm = 5;
                clarity = 5;
                break;
            case 'neutral':
                enthusiasm = 4;
                clarity = 5;
                break;
            default:
                enthusiasm = 1;
                clarity = 4;

        };

        return [String(enthusiasm) + ' / 5', String(clarity) + ' / 5'];

    };

    calculateProfessionalism(data) {

        let score = data.nlp.filter(x => x == 'Professional').length + 1;

        let description = 'The speakers\' introductory and concluding sentences are excellent.'
        switch(score) {

            case 1:
                description = 'The speakers\' introductory and concluding sentences are very unprofessional.'
            case 2:
                description = 'The speakers\' introductory and concluding sentences are poor and unprofessional.'
            case 3:
                description = 'The speakers\' introductory and concluding sentences are lacking in professionalism.'
            case 4:
                description = 'The speakers\' introductory and concluding sentences are fair.'

        };

        return [String(score) + ' / 5', description];

    };

    calculateEyeContact(data) {

        let ratio = parseInt(data.gazeRatio);
        let description = 'The presenter maintains eye contact throughout the video.';
        if (ratio == -1) {
            description = 'No faces were detected, or the webcam footage is too dark.';
        } else if (ratio < 30) {
            description = 'The presenter rarely maintains eye contact.';
        } else if (ratio < 60) {
            description = 'The presenter makes a conscious attempt to maintain eye contact throughout the video.'
        };

        return description;

    };

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

};

module.exports = PDF;