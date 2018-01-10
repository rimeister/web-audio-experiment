// Web Audio API experiment

// Vars
var startBtn = document.getElementById("start");
var stopBtn = document.getElementById("stop");

var context = new AudioContext; // Create audio context for the application
var oscillator = context.createOscillator(); // Make an oscilattor using the createOscillator method

oscillator.frequency.value = 200; // The frequency to 200 hz
oscillator.connect(context.destination); // Connects the oscillator to the audio context, I guess?

startBtn.addEventListener("click",startSound);
stopBtn.addEventListener("click",stopSound);

// Define Repeater class
function Repeater(interval,text) {
	// Repeater properties
	this.interval = interval;
	this.text = text;
	this._repeatInterval;
	this._soundIsPlaying = false;
	this._i = 0;
}

Repeater.prototype = {
	constructor: Repeater,
	// Repeater methods
	start: function() {
		var thisRepeater = this;
		if (!this._soundIsPlaying) {
			this._repeatInterval = setInterval(function(){
				console.log(thisRepeater.text + " " +thisRepeater._i);
				myRepeater._i++;
			},this.interval);
			this._soundIsPlaying = true;
		}

	},
	stop: function() {
		var thisRepeater = this;
		if (this._soundIsPlaying) {
			clearInterval(this._repeatInterval);
			this._soundIsPlaying = false;
		}

	}
}

// Instantiate a repeater
var myRepeater = new Repeater(1000,"Test");

// Functions
function startSound(event){

	event.preventDefault();
	oscillator.start(0);
	//myRepeater.start();

}

function stopSound(event){

	event.preventDefault();
	oscillator.stop(0);
//	myRepeater.stop();

}