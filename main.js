/* code here */

// fire query to count open tabs when new tab created
var openTabs;

chrome.browserAction.setBadgeBackgroundColor({color: '#3cb524'})

chrome.tabs.onCreated.addListener(() => {
	chrome.tabs.query({}, (tabs) => {
		openTabs = tabs.length;
		checkTabs(openTabs)
		//creates badge for tab count
		var num = openTabs.toString()
		console.log(num)
		chrome.browserAction.setBadgeText({text: num})
	})	
})
chrome.tabs.onRemoved.addListener(() => {
	chrome.tabs.query({}, (tabs) => {
		openTabs = tabs.length;
		checkTabs(openTabs)
		var num = openTabs.toString()
		chrome.browserAction.setBadgeText({text: num})
	})	
})

var checkTabs = (length) =>{
	if(length>10) {
		// set to warning colors
		chrome.browserAction.setBadgeBackgroundColor({color: '#b2b724'})
		if(length>20) chrome.browserAction.setBadgeBackgroundColor({color: '#ff6100'})
		// transform tabs to keys
    chrome.tabs.onActivated.addListener(function (tab){
      chrome.tabs.query({
          active: true
      }, function (activeTabs) {
        playNote(activeTabs[0].index)
      })
    })
	}
}

var polySynth = new Tone.PolySynth(6, Tone.Synth, {
 "oscillator" : {
   "partials" : [0, 2, 3, 4],
 },
 "volume": -12
}).toMaster();

function playNote(steps){
    let counter = steps, baseFrequency = 220;
    while (counter > 0){
      baseFrequency *= Math.pow(2,1/12)
      counter--
    }
    if (steps < 12) {
      polySynth.triggerAttackRelease(baseFrequency, 0.5)
    } else { // plays chords if over tab 12
      let third = baseFrequency * Math.pow(2,1/12) * Math.pow(2,1/12) * Math.pow(2,1/12);
      let fifth = third * Math.pow(2,1/12) * Math.pow(2,1/12) * Math.pow(2,1/12);
      console.log(baseFrequency, third, fifth)
      polySynth.triggerAttackRelease([baseFrequency,third, fifth], 0.5)

    }
}
