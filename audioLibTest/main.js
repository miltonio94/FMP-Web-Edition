
const edm = Synth.createInstrument('edm');
const piano = Synth.createInstrument('piano');

const generateButtons = (target, numbOfButtons) => {
    for(let i = 0, octave = 1, key = 1; i < numbOfButtons; i++){
        if(key === 8){
            key = 1;
            octave++;
        }
        
        let char = keyChar(key);        
        
        target.appendChild(createKey(char, octave, isKeySharp(i)));
        key++;
    }
}

const createKey = (keyChar, octave,  isSharp,) => {
    const black = "#262A2A";// #262A2A {r:0,g:0,b:0};
    const white = "#F9F9EF";// #F9F9EF {r:0,g:0,b:0};
    let key = document.createElement('button'); 

    key.setAttribute('keyChar', keyChar);
    key.setAttribute('octave', octave);
    key.innerHTML = keyChar;

    if(isSharp){
        // console.log("sharp key width " + width);
        key.setAttribute('class','sharp-key');

    }else{    
        // console.log("key width " + width);
        key.setAttribute('class', 'key');
    }

    // key.attr({'isSharp':isSharp});
    // key.attr({'pressed' : false});
    // key.attr({'keyNumber' :_keyNumber});

    return key;
}

const keyChar = (keyNumber) => {
    let char = '';

    switch(keyNumber){
        case 1:
            char = "C";
            break;
        case 2:
            char = "C#";
            break;
        case 3:
            char = "D";
            break;
        case 4:
            char = "D#";
            break;
        case 5:
            char = "E";
            break;
            case 6:
            char = "F";
        break;
            case 7:
            char = "F#";
        break;
            case 8:
            char = "G";
        break;
            case 9:
            char = "G#";
        break;
            case 10:
            char = "A";
        break;
            case 11:
            char = "A#";
        break;
            case 12:
            char = "B";
        break;
    }

    return char;
}

function isKeySharp(key){
    let retVal = false;
    
    switch (key % 12) {
        case 1:
            retVal = true;
            break;
        case 3:
            retVal = true;
            break;
        case 6:
            retVal = true;
            break;
        case 8:
            retVal = true;
            break;
        case 10:
            retVal = true;
            break;
        default:
            retVal = false;
            break;
    }
    
    return retVal;
}

const keys = document.getElementsByClassName('keys')[0];


generateButtons(keys, 61);

buttons = keys.children;


for(let button of buttons){
    button.addEventListener('click', (event) => {
        let note = event.target.getAttribute('keyChar');
        let octave = event.target.getAttribute('octave');
        let duration = 2;
    
        piano.play(note, octave, duration);    
    });
}
