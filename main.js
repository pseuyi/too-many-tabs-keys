/* code here */

var openTabs;
chrome.tabs.query({}, function(tabs){
	openTabs = tabs.length;
	console.log('num open', openTabs)
})

if(openTabs>10) {
	var polySynth = new Tone.PolySynth(6, Tone.Synth, {
	  "oscillator" : {
	    "partials" : [0, 2, 3, 4],
	  },
	  "volume": -12
	}).toMaster();

	console.log("MAIN JS")

	polySynth.triggerAttack("C4");
	
}
