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
	
	var newFrequency;

	switch (event.target.id) {
		case "c4": newFrequency = 261.6;
		break;
		case "d4": newFrequency = 293.7;
		break;
		case "e4": newFrequency = 329.6;
		break;
		case "f4": newFrequency = 349.2;
		break;
		case "g4": newFrequency = 392.0;
		break;
		case "a4": newFrequency = 440.0;
		break;
		case "b4": newFrequency = 493.9;
		break;
		case "c5": newFrequency = 523.3;
		break;
		default: console.log("Not C4");
	}

	oscillator.frequency.value = newFrequency;

}