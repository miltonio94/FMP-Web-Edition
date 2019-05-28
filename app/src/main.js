// const SVG = require('svg.js');
// const SerialPort = require('serialport');



console.log(SVG);


const N_BLACK = 25;
const N_WHITE = 36;
const STARTING_KEY_NUMBER = 36;




const black = "#262A2A";// #262A2A {r:0,g:0,b:0};
const white = "#F9F9EF";// #F9F9EF {r:0,g:0,b:0};
const red = "#EF131A";// #EF131A {r:0,g:0,b:0};
const blue = "#54A9E5";// #54A9E5 {r:0,g:0,b:0};
const orange = "#FD9025";// #FD9025 {r:0,g:0,b:0};
const green = "#D2DE47"; // #D2DE47 {r:0,g:0,b:0};
const grey = "#444748"; // #444748 


let mainDraw = document.getElementById('main');
let drawWidth = mainDraw.offsetWidth - (mainDraw.offsetWidth * .2) ;
let drawHeight = mainDraw.offsetHeight;

let draw = SVG("#drawing").size(drawWidth, drawHeight);

// console.log(SerialPort);

console.log(draw);

// const port = new  SerialPort('9600', {baudRate:9600});

console.log("width: " + drawWidth + "\t height: " + drawHeight);
let lanes = generateLines(N_WHITE, drawWidth, drawHeight, (drawWidth * .1), draw);
let piano = generatePiano(N_BLACK, N_WHITE, drawWidth, drawHeight, STARTING_KEY_NUMBER, draw);


if (navigator.requestMIDIAccess) {
    console.log('This browser supports WebMIDI!');
    navigator.requestMIDIAccess().then(onMidiSuccess, onMidiFailure);
} else {
    console.log('WebMIDI is not supported in this browser.');
}

function onMidiSuccess(midiAccess){
    console.log("success!!");
    
    let inputs = midiAccess.inputs;

    console.log(inputs);
    

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

    console.log("command: " + command + " note: " + note);
    

    if(command == 144){
        noteOn(note);
        console.log("on");
        
    }else if(command == 128){
        noteOff(note);
        console.log("off");
    }

    if(command == 159 ){
        fingerDown(note);
        console.log("on");
    }else if(command == 143){
        fingerUp(note);
        console.log("off");
    }
}


function fingerDown(fingerNumber){
    console.log("finger " + fingerNumber + " is down");
    
}
function fingerUp(fingerNumber){
    console.log("finger " + fingerNumber + " is up");
}

function noteOn(note){    
    if(piano[note - STARTING_KEY_NUMBER].attr().isSharp == 'true'){
        piano[note - STARTING_KEY_NUMBER].fill(blue);
    }else if(piano[note - STARTING_KEY_NUMBER].attr().isSharp == 'false'){
        piano[note - STARTING_KEY_NUMBER].fill(green);
    }  
}

function noteOff(note){
    if(piano[note - STARTING_KEY_NUMBER].attr().isSharp == 'true'){
        piano[note - STARTING_KEY_NUMBER].fill(black);
    } else if(piano[note - STARTING_KEY_NUMBER].attr().isSharp == 'false'){
        piano[note - STARTING_KEY_NUMBER].fill(white);
    }
   
}


function update(){

}

// function draw(){

// }