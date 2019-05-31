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

let hands = createHands();

whatFingerIsDown(hands);

let draw = SVG("#drawing").size(drawWidth, drawHeight);

let state = PLAYING;
let dt;
let previousTime = 0;

let lanes;
let piano;

let gameStats = {};

const notes = [
    noteSkeleton(30, 4, 72, -150, 'R1'),
    noteSkeleton(30, 4, 74, -550, 'R2'),
    noteSkeleton(30, 4, 76, -1050, 'R3'),
    noteSkeleton(30, 4, 77, -1550, 'R4'),
    noteSkeleton(30, 4, 79, -2150, 'R5'),
    noteSkeleton(30, 4, 60+4, -2750, 'L1'),
    noteSkeleton(30, 4, 59+3, -3350, 'L2'),
    noteSkeleton(30, 4, 57+3, -3950, 'L3'),
    noteSkeleton(30, 4, 55+4, -4750, 'L4'),
    noteSkeleton(30, 4, 53+4, -5150, 'L5'),
];



if (navigator.requestMIDIAccess) {
    state = PLAYING
    navigator.requestMIDIAccess().then(onMidiSuccess, onMidiFailure);
} else {
    state = NO_MIDI;
}

if(state == NO_MIDI){
    notes.forEach(el => {
        el.move(-1000, -1000);
    });
} else{
    
    
    lanes = generateLines(N_WHITE, drawWidth, drawHeight, (drawWidth * .1), draw);
    piano = generatePiano(N_BLACK, N_WHITE, drawWidth, drawHeight, STARTING_KEY_NUMBER, draw);
    
    createNotesFromSkeleton(notes, piano, STARTING_KEY_NUMBER, draw);
}

const update = () =>{    
    checkNoteOffEdge(notes);
    gameStats = updateGameStats(notes);
}

const animate = (dt) => {
    // console.log(dt);
    notes.forEach(moveNote);
}

const loop = (elapsed_time) => {
    dt = elapsed_time - previousTime;
    previousTime = elapsed_time;
    update();
    animate(dt);
    window.requestAnimationFrame(loop);   
    // console.log(notes);
    
}

window.requestAnimationFrame(loop);