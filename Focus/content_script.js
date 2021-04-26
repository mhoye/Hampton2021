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