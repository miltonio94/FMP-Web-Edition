const checkNoteOffEdge = (notes) => {   
     notes.forEach(n => {
        if(n.status === FALLING){
            if(n.svg.attr().y >= drawHeight + 10){
                n.status = OUT_OF_BOUNDS;
                if(piano[n.note - STARTING_KEY_NUMBER].attr().isSharp == 'true'){
                    piano[n.note - STARTING_KEY_NUMBER].fill(black);
                } else{
                    piano[n.note - STARTING_KEY_NUMBER].fill(white);
                }

                if(n.enterStat === NOT_YET_HIT){
                    n.enterStat = MISSED;
                }
                if(n.exitStat === NOT_YET_HIT){
                    n.exitStat = MISSED;
                }
                
            }
        } 
     });
}

const moveNote = (note) => {
    let newY = note.svg.attr().y + (note.velocity / dt);
    if(note.status === FALLING){
        note.move = note.svg.move(note.x, newY);
        moveFingerIndicator(note.fingerSvg, note.svg);
    }
};

const checkNoteHitOrMissOnMidiOn = (notes, key, noteNumber) => {
    notes.forEach(n => {        
        if(n.note == noteNumber && n.status === FALLING){
            let noteY = n.svg.attr().y + n.svg.attr().height;
            let keyY = key.attr().y;            

            let fingers = whatFingerIsDown(hands);
            console.log(n.finger === fingers[0]);
            
            fingers.forEach(fingerCode => {
                if(noteY >= keyY - HIT_THREASHOLD  && noteY <= keyY + HIT_THREASHOLD  && n.finger === fingerCode ){
                    key.fill(green);
                    n.enterStat = HIT;
                } else {
                    n.enterStat = MISSED;
                }     
            })
        } else{
            
        }
    });
};

const moveFingerIndicator = (finger, note) =>{
    let noteX = note.x();
    let noteY = note.y();
    let noteWidth = note.width();
    let noteHeight = note.height();
    let fingerBBox = finger.bbox();

    let newFingerX = noteX + noteWidth / 2 - fingerBBox.width / 2;
    let newFingerY = noteY + noteHeight / 2 - fingerBBox.height / 2;;

    finger.move(newFingerX, newFingerY);
}

const checkNoteHitOrMissOnMidiOff = (notes, key, noteNumber) => {    
    notes.forEach(n => {        
        if(n.note == noteNumber && n.status === FALLING ){
            let noteY = n.svg.attr().y;
            let keyY = key.attr().y;
            let keyHeight =  key.attr().height;

            if(noteY + n.height >= keyY - HIT_THREASHOLD && noteY <= keyY + keyHeight + HIT_THREASHOLD){
                key.fill(red);
            }

        }
    });
}

function noteSkeleton(velocity, duration, note, startY, finger){
    let svg = null;
    let fingerSvg = null
    let x = 0;
    let height = duration * velocity;
    let status = FALLING;
    let enterStat = NOT_YET_HIT; //status of note hitting the hit zone
    let exitStat = NOT_YET_HIT; // status of note exhiting hit zone
    
    return {
        velocity, 
        duration, 
        note, 
        finger : finger, 
        svg, 
        fingerSvg,
        startY, 
        height, 
        enterStat, 
        exitStat, 
        status
    };
}

const createNotesFromSkeleton = (notes, piano, startingKey, draw) => {
    notes.forEach( note => {
        let keyInfo = piano[note.note - startingKey].attr();
        note.x = keyInfo.x;
        note.width = keyInfo.width;
        
        note.svg = draw.rect(note.width, note.height);
        note.svg.move(note.x, note.startY);

        note.fingerSvg = draw.text(note.finger);
        note.fingerSvg.fill(black);
        moveFingerIndicator(note.fingerSvg, note.svg);
        note.svg.fill(blue);
        note.svg.stroke({color:black})
    });
}