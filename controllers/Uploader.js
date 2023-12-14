// const Uploader = require ('../aws/uploader.js');

// let uploader = new Uploader();

async function upload (request, response) {
    
    // let summary = await uploader.uploadPromise(request.body);
    let summary = {
        summary: "James is presenting his major project, which is a 3D Mwa and MA interactive environment that aims to solve three business problems: meeting user needs, finding a balance between game elements and educational value, and marketing in an unsaturated marketplace. The project involves four multilevel escape rooms to help users learn about malware, as well as a simple futuristic themed MEC to be distributed to visitors as a secondary option. The business impacts of the project include being cost effective, improving efficiency, and raising awareness and exposure.",
        transcript: "Good morning or good afternoon everyone. My name is James and I'll be talking about my major project which is based on 3D Mwa and MA interactive environment, business problems slash challenges. The first business problem or challenge is meeting the users' needs when our user plays our game environment, some of them may already have information or knowledge about malware beforehand or some may not. This will make it hard to satisfy the users' needs and some may find the information too lacking or some find it too excessive. We decided to solve this issue by letting test users test our environments to let them provide feedback. This will allow us to get user feedback which will let us know where to improve. In turn meeting the users' needs relevance to game elements and educational value would be the next business problems as users may feel demotivated to play. If the game element is low or on the other hand, if the game educational value is too low, the user won't learn much. This makes it hard to find a proper balance. However, this can be solved by also getting user feedback, we know that this may not meet all user needs as the sample size is low. The third business problem is marketing in an unsaturated marketplace. Since educational malware games are not very common, this sort of market will be hard to advertise. Furthermore, the target audience will be low since this will only interest a small percentage of people which may not make the game profitable but more for spreading awareness or the the solutions for the solutions slash findings of the project. We are spreading awareness due to lack of malware awareness due to the lack of due to the ever advancing more of technology, much data is stored online. However many people still do not know about the risks that are involved. For example, ill intent users may use malicious programs or AWAS to steal users personal information for their own game. Hence, we decided to create a 3d immersive environment where we will focus on four multilevel escape rooms for users to partake this will help users to learn more about malware through the escape rooms. The rules will also be each on a different topic such as types of malware and types of attacks. Secondly, we also hope to raise recognition for T PM malware analysis center M AC for short, since circumstances may occur such as COVID lockdown or our M AC staff not being available. We decided to create a simple futuristic themed mec that can be distributed to our visitors as a secondary option for a brief online tour around a futuristic M AC. This will in turn also help to increase recognition for our for our awareness center business impacts the first business impact will be on cost. This project business impact cost will be cheap as developers are students. This will mean that the platform used by students in this case, which is UN T 3D will be free. This will lower cost me in turn saving money. The second business impact will be efficiency. Since the project will be done by students in the cybersecurity course, we will already have retaining information about malware. We will only then need to learn from scratch how to create a game environment. Although this will be tough, this will let us learn new things and improve ourselves. This can be applicable in a real environment such by when the company starts, improves and learn new things. The company will also improve overall last but not least the third business impact will be about spreading awareness or exposure. Since we decided to include the TP MS C, this project can also showcase and give exposure to our mec by giving a simple tour in our game environment. This can increase thematic police recognition. On the other hand, this project will also raise awareness about malware's and lead to public benefit and branding, which will also help more people to know more about T PM EC as well as malware. With that, we'll come to the end of the presentation. Thank you."
    }

    response.json({"summary": summary.summary, "transcript": summary.transcript});

}

module.exports = { upload };