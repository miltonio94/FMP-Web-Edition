
const noteOn = (note) => {
        playSound(pianoSynth, note);
        piano[note - STARTING_KEY_NUMBER].fill(red);
        checkNoteHitOrMissOnMidiOn(notes, piano[note - STARTING_KEY_NUMBER], note);
}

const noteOff = (note) =>{
    if(piano[note - STARTING_KEY_NUMBER].attr().isSharp == 'true'){
        piano[note - STARTING_KEY_NUMBER].fill(black);
    } else if(piano[note - STARTING_KEY_NUMBER].attr().isSharp == 'false'){
        piano[note - STARTING_KEY_NUMBER].fill(white);
    } 
    checkNoteHitOrMissOnMidiOff(notes, piano[note - STARTING_KEY_NUMBER], note);
}

const noteOnMenu = (note) => {
    if(note === 72){
        piano[note - STARTING_KEY_NUMBER].fill(green);
        setTimeout(()=>{window.location.href = 'game.html'}, 500)
    } else{
        piano[note - STARTING_KEY_NUMBER].fill(grey);
    }
    
}

const noteOffMenu = (note) =>{
if(piano[note - STARTING_KEY_NUMBER].attr().isSharp == 'true'){
    piano[note - STARTING_KEY_NUMBER].fill(black);
} else if(piano[note - STARTING_KEY_NUMBER].attr().isSharp == 'false'){
    piano[note - STARTING_KEY_NUMBER].fill(white);
} 
}

const onMidiFailure = () =>{
    state = NO_MIDI;
}

const getMidiMsg = (msg) =>{
    let command = msg.data[0];
    let note = msg.data[1];

    if(command == 144){
        noteOn(note);
    }else if(command == 128){
        noteOff(note);
    }

    if(command == 159 ){
        fingerDown(note, hands);
    }else if(command == 143){
        fingerUp(note, hands);
    }
}

const getMidiMsgMenu = (msg) =>{
    let command = msg.data[0];
    let note = msg.data[1];

    if(command == 144){
        noteOnMenu(note);
    }else if(command == 128){
        noteOffMenu(note);
    }
}

const onMidiSuccess = (midiAccess) =>{
    let inputs = midiAccess.inputs;

    for(let input of midiAccess.inputs.values()){
        input.onmidimessage = getMidiMsg;
    }
}

const onMidiSuccessMenu = (midiAccess) =>{
    let inputs = midiAccess.inputs;

    for(let input of midiAccess.inputs.values()){
        input.onmidimessage = getMidiMsgMenu;
    }
}