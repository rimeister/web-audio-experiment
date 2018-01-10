// Web Audio API
var startBtn = document.getElementById("start");
var stopBtn = document.getElementById("stop");
var soundIsPlaying = false;

startBtn.addEventListener("click",startSound);
stopBtn.addEventListener("click",stopSound);

function startSound(event){

	event.preventDefault();

	if (!soundIsPlaying) {
		console.log("Sound started");	
		soundIsPlaying = true;
	}

}

function stopSound(event){

	event.preventDefault();

	if (soundIsPlaying) {
		console.log("Sound stopped");
		soundIsPlaying = false;
	}

}