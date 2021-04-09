let form = document.getElementById('home');
form.addEventListener('submit', function(event){
	event.preventDefault() //keep from submitting until we grab the info
	setSession(document.getElementById('session').value);
	setInterval(document.getElementById('interval').value);
	console.log("Starting Session");
});

//let session = document.querySelector('session');
//let interval = docuument.querySelector('interval');

//when the user changes input, update storage value
//session.addEventListener('change', e => setSession(e.target.value));
//interval.addEventListener('change', e => setInterval(e.target.value));

async function setSession(session_length) {
	await browser.storage.local.set({ session_length });
}

async function setInterval(interval_length) {
	await browser.storage.local.set({ interval_length })
}

async function init() {
	//put the slider in same position from last use
	let { session_length } = browser.local.storage.get('session_length');
	let { interval_length } = browser.local.storage.get('interval_length');

	//for first-time users, put slider at 0
	if(!session_length) {
		session_length = 0;
	}

	if(!interval_length) {
		interval_length = 0;
	}

	//adjust the slider
	session.value = session_length;
	interval.value = interval_length;

	//update storage
	setSession(session_length);
	setInterval(interval_length);
}

init().catch(e => console.error(e));