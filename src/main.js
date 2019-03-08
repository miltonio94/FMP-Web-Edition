const N_BLACK = 25;
const N_WHITE = 36;
const STARTING_KEY_NUMBER = 36;

let mainDraw = document.getElementById('main');
let drawWidth = mainDraw.offsetWidth;
let drawHeight = mainDraw.offsetHeight;

let draw = SVG("#drawing").size(drawWidth, drawHeight);

console.log("width: " + drawWidth + "\t height: " + drawHeight);

let piano = generatePiano(N_BLACK, N_WHITE, drawWidth, drawHeight, STARTING_KEY_NUMBER, draw);


if (navigator.requestMIDIAccess) {
    console.log('This browser supports WebMIDI!');
    navigator.requestMIDIAccess().then(onMidiSuccess, onMidiFailure);
} else {
    console.log('WebMIDI is not supported in this browser.');
}

function onMidiSuccess(midiAccess){
    let inputs = midiAccess.inputs;

    for(let input of midiAccess.inputs.values()){
        input.onmidimessage = getMidiMsg;
    }
}

function onMidiFailure(){
    console.log("Error!");
}

function getMidiMsg(msg){
    let command = msg.data[0];
    let note = msg.data[1];

    if(command == 144){
        noteOn(note);
    }else if(command == 128){
        noteOff(note);
    }
}

function noteOn(note){    
    if(piano[note - STARTING_KEY_NUMBER].attr().isSharp == 'true'){
        piano[note - STARTING_KEY_NUMBER].fill("blue");
    }else if(piano[note - STARTING_KEY_NUMBER].attr().isSharp == 'false'){
        piano[note - STARTING_KEY_NUMBER].fill("green");
    }  
}

function noteOff(note){
    if(piano[note - STARTING_KEY_NUMBER].attr().isSharp == 'true'){
        piano[note - STARTING_KEY_NUMBER].fill("black");
    } else if(piano[note - STARTING_KEY_NUMBER].attr().isSharp == 'false'){
        piano[note - STARTING_KEY_NUMBER].fill("white");
    }
   
}