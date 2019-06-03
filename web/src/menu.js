let state = MAIN_MENU;

let mainDraw = document.getElementById('main');
let drawWidth = mainDraw.offsetWidth - (mainDraw.offsetWidth * .2) ;
let drawHeight = mainDraw.offsetHeight;

let textBBox = null;

let draw = SVG("#drawing").size(drawWidth, drawHeight);

let piano;

if (navigator.requestMIDIAccess) {
    state = PLAYING
    navigator.requestMIDIAccess().then(onMidiSuccessMenu, onMidiFailure);
} else {
    state = NO_MIDI;
}

let noMidiText = null;

let fingerOptionRect = null;
let chordOptionRect = null;
let songOptionRect = null;

let fingerOptionText = null;
let chordOptionText = null;
let songOptionText = null;

let fingerOptionGroup = null;
let chordOptionGroup = null;
let songOptionGroup = null;


if(state === NO_MIDI){
    noMidiText = draw.text(add =>{
        add.tspan("Your browser doesn't support MIDI! Please switch to Chrome");
    });

    noMidiText.font({size : 80, anchor:'middle'});

    textBBox = noMidiText.bbox();
    noMidiText.move(mainDraw.offsetWidth / 2 - textBBox.width / 2 , drawHeight / 2 -  textBBox.height / 2);
    noMidiText.fill(orange);
    
} else{
    piano = piano = generatePiano(N_BLACK, N_WHITE, drawWidth, drawHeight, STARTING_KEY_NUMBER, draw);
    piano[72 - STARTING_KEY_NUMBER].fill(orange)

    let squareWidth = mainDraw.offsetWidth * .25
    let margin = mainDraw.offsetWidth * .05
    let squareY = ((drawHeight - drawHeight / 6) / 2 ) - (squareWidth / 2);

    fingerOptionRect = draw.rect(squareWidth, squareWidth )
    chordOptionRect = draw.rect(squareWidth, squareWidth)
    songOptionRect = draw.rect(squareWidth, squareWidth)

    fingerOptionRect.move(margin, squareY);
    chordOptionRect.move(fingerOptionRect.x() + squareWidth + margin * 1.5, squareY);
    songOptionRect.move(chordOptionRect.x() + squareWidth + margin * 1.5, squareY);

    fingerOptionRect.fill(blue)
    chordOptionRect.fill(grey);
    songOptionRect.fill(grey);

    fingerOptionText = draw.text('Learn finger technique').font({size: 40}).fill(orange);
    chordOptionText = draw.text('Learn chords').font({size: 40}).fill(black);
    songOptionText = draw.text('Lets play a song').font({size: 40}).fill(black);



    textBBox = fingerOptionText.bbox();
    fingerOptionText.move(fingerOptionRect.x() + squareWidth / 2 - textBBox.width / 2 
                          , squareY + squareWidth / 2 - textBBox.height / 2)

    textBBox = chordOptionText.bbox();
    chordOptionText.move(chordOptionRect.x() + squareWidth / 2 - textBBox.width / 2 
                        , squareY + squareWidth / 2 - textBBox.height / 2)

    textBBox = songOptionText.bbox();
    songOptionText.move(  songOptionRect.x() + squareWidth / 2 - textBBox.width / 2
                        , squareY + squareWidth / 2 - textBBox.height / 2)
    

}