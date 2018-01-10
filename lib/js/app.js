// Web Audio API experiment

// Vars
var startBtn = document.getElementById("start");
var stopBtn = document.getElementById("stop");
var soundIsPlaying = false;

startBtn.addEventListener("click",startSound);
stopBtn.addEventListener("click",stopSound);

// Define Repeater class
function Repeater(interval,text,num) {
	this.interval = interval;
	this.text = text;
	this._repeatInterval;
	this._soundIsPlaying = false;
	this._i = 0;
}

Repeater.prototype = {
	constructor: Repeater,
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

	myRepeater.start();

}

function stopSound(event){

	event.preventDefault();

	myRepeater.stop();

}