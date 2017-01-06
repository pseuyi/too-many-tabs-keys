/* code here */
var polySynth = new Tone.PolySynth(6, Tone.Synth, {
  "oscillator" : {
    "partials" : [0, 2, 3, 4],
  },
  "volume": -12
}).toMaster();

console.log("MAIN JS")

polySynth.triggerAttack("C4");
