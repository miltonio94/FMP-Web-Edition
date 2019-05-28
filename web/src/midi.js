
const noteOn = (note) => {     
    if(piano[note - STARTING_KEY_NUMBER].attr().isSharp == 'true'){
        piano[note - STARTING_KEY_NUMBER].fill(blue);
    }else if(piano[note - STARTING_KEY_NUMBER].attr().isSharp == 'false'){
        piano[note - STARTING_KEY_NUMBER].fill(green);
    }  
}

const noteOff = (note) =>{
    if(piano[note - STARTING_KEY_NUMBER].attr().isSharp == 'true'){
        piano[note - STARTING_KEY_NUMBER].fill(black);
    } else if(piano[note - STARTING_KEY_NUMBER].attr().isSharp == 'false'){
        piano[note - STARTING_KEY_NUMBER].fill(white);
    }
}

const onMidiFailure = () =>{
    console.log("Error!");
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
        fingerDown(note);
    }else if(command == 143){
        fingerUp(note);
    }
}

const onMidiSuccess = (midiAccess) =>{
    let inputs = midiAccess.inputs;

    for(let input of midiAccess.inputs.values()){
        input.onmidimessage = getMidiMsg;
    }
}