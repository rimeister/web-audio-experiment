// Web Audio API experiment

// Vars
var startBtn = document.getElementById("start");
var stopBtn = document.getElementById("stop");
var noteBtns = document.getElementsByClassName("playNote");

var context = new AudioContext; // Create audio context for the application
var oscillator = context.createOscillator(); // Make an oscilattor using the createOscillator method

oscillator.frequency.value = 200; // The frequency to 200 hz
oscillator.connect(context.destination); // Connects the oscillator to the audio context, I guess?

// Add event listeners to start and stop buttons
startBtn.addEventListener("click",startSound);
stopBtn.addEventListener("click",stopSound);

for (var i = 0; i < noteBtns.length; i++) {
	noteBtns[i].addEventListener("click",playNote);
}

// Add event listeners to each note button

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

function playNote(){
	
	event.preventDefault; // Prevent anchor tag from refreshing page

	switch (event.target.id) {
		case "c4": console.log("C4 has been played");
		break;
		default: console.log("Not C4");
	}

}