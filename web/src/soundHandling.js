const playSound = (synth, midi) => {    
    let octave = midiToOctave(midi);
    let keyChar = noteChar(midi%12);   

    synth.play(keyChar, octave, 2)
}

const midiToOctave = (midi) => {
    let octave = 0;
    octave = Math.floor((midi/12));

    return octave;
}

const noteChar = (noteNumber) => {    
    let char = '';

    switch(noteNumber){
        case 0:
            char = "C";
            break;
        case 1:
            char = "C#";
            break;
        case 2:
            char = "D";
            break;
        case 3:
            char = "D#";
            break;
        case 4:
            char = "E";
            break;
        case 5:
            char = "F";
        break;
        case 6:
            char = "F#";
        break;
            case 7:
            char = "G";
        break;
            case 8:
            char = "G#";
        break;
            case 9:
            char = "A";
        break;
            case 10:
            char = "A#";
        break;
            case 11:
            char = "B";
        break;
    }

    return char;
}