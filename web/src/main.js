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

let state = PLAYING;
let dt;
let previousTime = 0;

let lanes;
let piano;

const notes = [
    noteSkeleton(50, 2, 72, 400, 'R1'),
    noteSkeleton(50, 2, 74, 300, 'R2'),
    noteSkeleton(50, 2, 76, 200, 'R3'),
    noteSkeleton(50, 2, 77, 100, 'R4'),
    noteSkeleton(50, 2, 79, 000, 'R5'),
    noteSkeleton(50, 2, 60, 400, 'L1'),
    noteSkeleton(50, 2, 59, 300, 'L2'),
    noteSkeleton(50, 2, 57, 200, 'L3'),
    noteSkeleton(50, 2, 55, 100, 'L4'),
    noteSkeleton(50, 2, 53, 000, 'L5'),
];

if (navigator.requestMIDIAccess) {
    console.log('This browser supports WebMIDI!');
    navigator.requestMIDIAccess().then(onMidiSuccess, onMidiFailure);
} else {
    console.log('WebMIDI is not supported in this browser.');
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

}

const animate = (dt) => {
    // console.log(dt);
    notes.forEach( el => {
        let newY = el.svg.attr().y + (el.velocity / dt);
        el.move = el.svg.move(el.x, newY);
    });
}

const loop = (elapsed_time) => {
    dt = elapsed_time - previousTime;
    previousTime = elapsed_time;
    update();
    animate(dt);
    window.requestAnimationFrame(loop);
    
}

window.requestAnimationFrame(loop);