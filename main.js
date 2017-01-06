/* code here */
var polySynth = new Tone.PolySynth(6, Tone.Synth, {
  "oscillator" : {
    "partials" : [0, 2, 3, 4],
  },
  "volume": -12
}).toMaster();

console.log("MAIN JS")

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

chrome.tabs.onActivated.addListener(function (tab){
  chrome.tabs.query({
      active: true
  }, function (activeTabs) {
    playNote(activeTabs[0].index)
  })
})
