/* code here */

// fire query to count open tabs when new tab created
var openTabs;

chrome.tabs.onCreated.addListener(() => {
	console.log('counting')

	chrome.tabs.query({}, (tabs) => {
		console.log('in query', tabs.length)
		openTabs = tabs.length;
		checkTabs(openTabs)
	})	

})

var checkTabs = (length) =>{
	if(length>10) {
		// transform tabs to keys
		var polySynth = new Tone.PolySynth(6, Tone.Synth, {
		  "oscillator" : {
		    "partials" : [0, 2, 3, 4],
		  },
		  "volume": -12
		}).toMaster();

		console.log("MAIN JS")

		polySynth.triggerAttack("C4");

	}
}
