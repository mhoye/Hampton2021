
const form = document.getElementById('home');

form.addEventListener('submit', function(event){
	event.preventDefault() //keep from submitting until we grab the info
	let session = document.getElementById('session').value;
	let interval = document.getElementById('interval').value;
	setSession(session);
	setInterval(interval);
	console.log(`Session: ${session}`);
	console.log(`Interval: ${interval}`);
	runSession();
});

async function setSession(session_length) {
	await browser.storage.local.set({ session_length });
	//.then(() => browser.storage.local.get({session_length:''}))
    //.then(({session_length}) => alert(session_length));
}

async function setInterval(interval_length) {
	await browser.storage.local.set({ interval_length })
}



 /*async function init(e) {
	
	//put the slider in same position from last use
    /*
	let { session_length } = browser.local.storage.get('session_length');
	let { interval_length } = browser.local.storage.get('interval_length');

	//for first-time users, put slider at 0
	if(!session_length) {
		session_length = 0;
	}

	if(!interval_length) {
		interval_length = 0;
	}*/

	//adjust the slider
	//session.value = session_length;
	//interval.value = interval_length;

	//update storage
	//setSession(session_length);
	//setInterval(interval_length);
//}


