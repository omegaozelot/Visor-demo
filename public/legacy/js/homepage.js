const lbox = document.getElementById('initloginbox');
const rbox = document.getElementById('regisbox');
const regn = document.getElementById('regis');
const retn = document.getElementById('goback');

let wait = (time) => new Promise(resolve => setTimeout(resolve, time)); 

let showRegis = async () => {

	lbox.style.left = '-610px';
	await wait(800)
	rbox.style.left = '0px';

}

let returnToLogin = async () => {

	rbox.style.left = '-610px';
	await wait(800)
	lbox.style.left = '0px';

}

if (regn) regn.addEventListener('click', showRegis, false)
if (retn) retn.addEventListener('click', returnToLogin, false)