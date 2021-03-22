//listen for changes to value in storage and react on the page

let style = document.createElement('style');

document.body.appendChild(style);

browser.storage.onChanged.addListener((changes, area) => {
	if (area === 'local' && 'session_length' in changes) {
		update(changes.session_length.newValue, changes.interval_length);
	}
});

function update(session_length, interval_length) {
	//set timer for the session
	runSession(session_length,interval_length);
}

function runSession(session_length, interval_length) {
	var iterations = (session_length*60)/interval_length;
	setTimeout(endSession, (session_length*3600000));
	while(iterations > 0) {
		setTimeout(breakTime, (interval_length*60000));
		setTimeout(workTime, 300000);
	}
}

function breakTime() {
	alert("It is time for a break! Step away from your computer for 5 minutes...");
}

function workTime() {
	alert("Time to get back to work!");
}

function endSession() {
	alert("*Your Focus Session Has Ended*");
}

browser.storage.local.get('value').then(result => update(result.value));