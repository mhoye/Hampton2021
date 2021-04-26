

async function setSession(session_length) { 
	browser.storage.local.set({session_length})
	.then(console.log("Session Set!"),console.log("ERROR:Session not set..."));
}

async function setInterval(interval_length) {
	browser.storage.local.set({interval_length})
	.then(console.log("Interval Set!"),console.log("ERROR:Interval not set..."));
}

function runSession() {
	let interval = browser.storage.local.get("interval_length");
	let session = browser.storage.local.get("session_length");
	console.log(`Session: ${session}`);
	console.log(`Interval: ${interval}`);
	var x = setInterval(function() {
		end_time = new Date().getTime()+(session*3600000);
		current_time = new Date().getTime();
		var time_left = end_time - current_time;
		var hours = Math.floor((time_left % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((time_left % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((time_left % (1000 * 60)) / 1000);
		
		document.getElementById("timer").innerHTML = hours+":"+minutes+":"+seconds;
		if(time_left < 0){
			clearInterval();
			document.getElementById("timer").innerHTML = "Your session has ended!";
		}
	},1000);
}

	

	/*var iterations = (session*60)/interval;
	alert("Your session starts now!");
	setTimeout(endSession, (session*3600000));
	while(iterations > 0) {
		setTimeout(breakTime, (interval*60000));
		setTimeout(workTime, 300000);
	}*/

function breakTime() {
	alert("It is time for a break! Step away from your computer for 5 minutes...");
}

function workTime() {
	alert("Time to get back to work!");
}

function endSession() {
	alert("*Your Focus Session Has Ended*");
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


