/* code here */
var polySynth = new Tone.PolySynth(6, Tone.Synth, {
  "oscillator" : {
    "partials" : [0, 2, 3, 4],
  },
  "volume": -12
}).toMaster();

console.log("MAIN JS")

function playSound(steps){
  let counter = steps, baseFrequency = 220;
  while (counter > 0){
    baseFrequency *= Math.pow(2,1/12)
    counter--
  }
  polySynth.triggerAttackRelease(baseFrequency, 0.5)
}

chrome.tabs.onActivated.addListener(function (tab){
  chrome.tabs.query({
      active: true              // Select active tabs
  }, function (activeTabs) {
    playSound(activeTabs[0].index)
  })
})
