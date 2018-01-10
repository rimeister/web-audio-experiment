// Web Audio API experiment

// Vars
var startBtn = document.getElementById("start");
var stopBtn = document.getElementById("stop");
var noteBtns = document.getElementsByClassName("playNote");

// const for milliseconds in a minute
var millisecondsPerMinute = 60000;

var context = new AudioContext; // Create audio context for the application
var oscillator = context.createOscillator(); // Make an oscilattor using the createOscillator method

oscillator.type = "triangle"; // Set waveform to triangle (sine is default)
oscillator.frequency.value = 200; // The frequency to 200 hz
oscillator.connect(context.destination); // Connects the oscillator to the audio context, I guess?

// Add event listeners to start and stop buttons
startBtn.addEventListener("click",startSound);
stopBtn.addEventListener("click",stopSound);

for (var i = 0; i < noteBtns.length; i++) {
	noteBtns[i].addEventListener("click",playNote);
}


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


// Define class for sequence generator
function Generator(oscillator,bpm,subdivision) {
	// Pass in the oscillator you want the generator to act upon
	this.oscillator = oscillator;
	this.bpm = bpm;
	this.subdivision = subdivision;
	this._repInt;
}

Generator.prototype = {
	
	constructor: Generator,
	start: function() {
		var thisGenerator = this;
		this._repInt = setInterval(function(){
			console.log( getRandomNoteDuration(thisGenerator.bpm,thisGenerator.subdivision) );
		},1000);
	},
	stop: function() {
		//var thisGenerator = this;
		clearInterval(this._repInt);
	}

}



// Instantiate a repeater
var myRepeater = new Repeater(1000,"Test");

// New generator, 60bpm, 8 = eigth notes
var myGenerator = new Generator(oscillator,60,8)

// Functions
function startSound(event){

	event.preventDefault();
	//oscillator.start(0);
	myGenerator.start();
	//myRepeater.start();

}

function stopSound(event){

	event.preventDefault();
	myGenerator.stop();
//	oscillator.stop(0);
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

// Function that returns a random note duration. Returns a note that is between the subdivision length (e.g., 16, 8, 4, 2) and a whole note.
function getRandomNoteDuration(bpm,subdivision) {

	// length of one beat in ms
	var lengthOfOneBeat = millisecondsPerMinute/bpm;

	// Get a random power of 2 -- 1,2,4,8,16
	var randomDivision = Math.pow( 2, Math.floor( Math.random() * ( Math.log2(subdivision) + 1) ) );

	// Divide the length of one beat by a random division
	var randomDuration = lengthOfOneBeat / randomDivision;
	
	return randomDuration;
}

