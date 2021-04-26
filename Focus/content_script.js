//Doc Purpose: listen for the browser habits for end browsing report
console.log("Focus Exstension Enabled");
let currentTab = null;
//listen for navigation from tab to tab
browser.tabs.onActivated.addListener((event) => currentTab = event.tabId);

setInterval(updateBrowseTime, 1000);
async function updateBrowseTime(){
	if(!currentTab){
		return;
	}
	let frames = null;
	try{
		frames = await browser.webNavigation.getAllFrames({"tabId": currentTab});
	} catch (error) {
		console.log(error);
	}

	let frame = frames.filter((frame) => frame.parentFrameId == -1)[0];

	if (!frame.url.startsWith('http')) {
		return;
	}
	let hostname = new URL(frame.url).hostname;
	try {
		let seconds = await browser.storage.local.get({[hostname]: 0});
		browser.storage.local.set({[hostname]: seconds[hostname]+1});
		console.log(hostname);
	} catch (error) {
		console.log(error);
	}
}

function runTimer(session){
	console.log('Starting timer...');
	let s=session;
	console.log(`Session Length: ${session}`);
	var end_time = new Date().getTime()+(s*3600000);
	let x = setInterval(function(){
		var current_time = new Date().getTime();
		var time_left = end_time - current_time;
		var hours = Math.floor((time_left % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((time_left % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((time_left % (1000 * 60)) / 1000);
		let h,m,s;
		if(hours < 10){
			h = "0"+hours;
		} else {
			h = hours;
		}
		if(minutes < 10){
			m = "0"+minutes;
		} else {
			m = minutes;
		}
		if(seconds < 10){
			s = "0"+seconds;
		} else {
			s = seconds;
		}
		document.getElementById("timer").innerHTML = h+":"+m+":"+s;
		if(time_left <= 0){
			clearInterval(x);
			document.getElementById("timer").innerHTML = "Your session has ended!";
			alert("Your session has ended!");
		}
	},1000);
	return x;
}