let mainDraw = document.getElementById('main');
let drawWidth = mainDraw.offsetWidth - (mainDraw.offsetWidth * .2) ;
let drawHeight = mainDraw.offsetHeight;

let hands = createHands();

let draw = SVG("#drawing").size(drawWidth, drawHeight);

let state = COUNTDOWN;
let dt;
let previousTime = 0;

let lanes;
let piano;

const edm = Synth.createInstrument('edm');
const pianoSynth = Synth.createInstrument('piano');

let count = 5;
countDownText = draw.text(count + '');
countDownText.font({size:100});
countDownText.fill(orange);
countDownText.move(-1000);



const countDown = ()=>{
    if(count <= 5 && count >= 0){        
            console.log(1000 % 1000);
            countDownText.text(count + '');
            textBBox = countDownText.bbox();
            countDownText.move(  mainDraw.offsetWidth / 2 - textBBox.width / 2
                               , (drawHeight - drawHeight / 6) / 2 - textBBox.height / 2);
            count--;
            countDownMidi
    } else{
        countDownText.move(-1000);
        state = PLAYING;
    }
}

let gameStats = {};
let scoreSVG = draw.text('Accurracy: 0%')
scoreSVG.move(-1000);

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

let noMidiText = null;


if (navigator.requestMIDIAccess) {
    state = COUNTDOWN
    navigator.requestMIDIAccess().then(onMidiSuccess, onMidiFailure);

    setInterval(countDown, 1000);
} else {
    state = NO_MIDI;
}

if(state == NO_MIDI){
    noMidiText = draw.text(add =>{
        add.tspan("Your browser doesn't support MIDI! Please switch to Chrome");
    });

    noMidiText.font({size : 80, anchor:'middle'});

    textBBox = noMidiText.bbox();
    noMidiText.move(mainDraw.offsetWidth / 2 - textBBox.width / 2 , drawHeight / 2 -  textBBox.height / 2);
    noMidiText.fill(orange);
} else{
    
    lanes = generateLines(N_WHITE, drawWidth, drawHeight, (drawWidth * .1), draw);
    piano = generatePiano(N_BLACK, N_WHITE, drawWidth, drawHeight, STARTING_KEY_NUMBER, draw);   
    scoreSVG.fill(grey);
    createNotesFromSkeleton(notes, piano, STARTING_KEY_NUMBER, draw);
}

const update = () =>{    
    checkNoteOffEdge(notes);
    gameStats = updateGameStats(notes);
    if(state == PLAYING){
        updateGameScore(gameStats, scoreSVG);
        calculateScorePosition(scoreSVG);
    }
    // console.log(gameStats);    
}

const animate = (dt, elapsed_time) => {
    // console.log(dt);
    if(state === PLAYING){
        notes.forEach(moveNote);
    }
    // } else if(state === COUNTDOWN){
    //     countDown(elapsed_time);
    // }
}

const loop = (elapsed_time) => {
    dt = elapsed_time - previousTime;
    previousTime = elapsed_time;
    update();
    animate(dt, elapsed_time);
    window.requestAnimationFrame(loop);   
    // console.log(notes);
    
}

if(state !== NO_MIDI){
    window.requestAnimationFrame(loop);  
} 