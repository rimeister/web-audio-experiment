// Web Audio API experiment

/****************************
******** Variables **********
/***************************/

var startBtn = document.getElementById("start");
var stopBtn = document.getElementById("stop");
var noteBtns = document.getElementsByClassName("playNote");

// Frequencies of notes in the C Major scale, from C4 to C5
var cMajorScale = [261.6,293.7,329.6,349.2,392.0,440.0,493.9,523.3]

// const for milliseconds in a minute
var millisecondsPerMinute = 60000;


/****************************
******** Classes ************
/***************************/

// Voltage Controlled Oscillator (VCO) definition
function VCO(context) {
	this.oscillator = context.createOscillator();
	this.oscillator.type = 'triangle';
	this.setFrequency(440);
	this.input = this.oscillator;
	this.output = this.oscillator;
	this._hasStarted = false;
};

VCO.prototype = {

	constructor: VCO,
	start: function(){
		if (!this._hasStarted) {
			this.oscillator.start(0);	
			this._hasStarted = true;	
		}
	},
	stop: function(){
		if (this._hasStarted) {
			this.oscillator.stop(0);
		}
	},
	setFrequency: function(frequency) {
		this.oscillator.frequency.setValueAtTime(frequency, context.currentTime);
	},
	connect: function(node) {
		if (node.hasOwnProperty('input')) {
			this.output.connect(node.input);
		} else {
			this.output.connect(node);
		}
	}

}

// Melody generator definition
function Generator(vco,bpm,subdivision) {
	// Pass in the vco you want the generator to act upon
	this.vco = vco;
	this.bpm = bpm;
	this.subdivision = subdivision;
	this._timeout;
	this._generatorRunning = false;
}

Generator.prototype = {
	
	constructor: Generator,
	start: function() {

		var thisGenerator = this;

		function changeNote() {
			var randomInt = getRandomNoteDuration(60,16);
			var randomNote = cMajorScale[Math.floor((Math.random() * 8))];
		    thisGenerator._timeout = setTimeout(changeNote, randomInt);
		    thisGenerator.vco.setFrequency(randomNote); // put random note here
		    var addCircle = new Circle(randomNote,randomInt);
		    addCircle.display();
		}
		
		this._timeout = setTimeout(changeNote, getRandomNoteDuration(60,16));

	},
	stop: function() {
		var thisGenerator = this;
		this._generatorRunning = false;
		clearTimeout(this._timeout);
	}

}

function Circle(noteValue,noteDuration) {

	this.note = noteValue;
	this.duration = noteDuration;
	this._fillColour = "#FF0000"; // Red
	this._xPos = Math.floor(Math.random()*width);
	this._yPos = Math.floor(height - noteValue);
	this._diameter = 50;

}

Circle.prototype = {

	constructor: Circle,
	display: function() {
		fill(this._fillColour);
		noStroke();
		ellipse(this._xPos, this._yPos, this._diameter, this._diameter);
	}

}

/****************************
******* Main Program ********
/***************************/

// Add event listeners to start and stop buttons
startBtn.addEventListener("click",function(event){
	event.preventDefault();
	myVCO.start(0);
	myGenerator.start();
});

stopBtn.addEventListener("click",function(event){
	event.preventDefault();
	myGenerator.stop();
	myVCO.stop(0);
});

// Create audio context for the application
var context = new AudioContext; 

// Make an oscilattor using the VCO class
var myVCO = new VCO(context);

// Connect the oscillator to the context
myVCO.connect(context.destination);

// Make new melody generator, 60bpm, 8 = eigth notes
var myGenerator = new Generator(myVCO,60,8);

function setup() {
	createCanvas(window.innerWidth,window.innerHeight)
}

/****************************
******** Functions **********
/***************************/

// Function that returns a random note duration. Returns a note that 
// is between the subdivision length (e.g., 16, 8, 4, 2) and a whole note.
function getRandomNoteDuration(bpm,subdivision) {

	// length of one beat in ms
	var lengthOfOneBeat = millisecondsPerMinute/bpm;

	// Get a random power of 2 -- 1,2,4,8,16
	var randomDivision = Math.pow( 2, Math.floor( Math.random() * ( Math.log2(subdivision) + 1) ) );

	// Divide the length of one beat by a random division
	var randomDuration = lengthOfOneBeat / randomDivision;
	
	return randomDuration;
}