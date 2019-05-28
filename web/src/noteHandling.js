

const moveNote = (note) => {
    const noteSpeed = note.velocity;
    const noteDuration = note.duration;
};
function noteSkeleton(velocity, duration, note, startY, finger){
    let svg = null;
    let x = 0;
    let height = duration * velocity;
    let skeleton = {velocity, duration, note, finger, svg, startY, height};
    
    return skeleton;
}

const createNotesFromSkeleton = (notes, piano, startingKey, draw) => {
    notes.forEach( note => {
        let keyInfo = piano[note.note - startingKey].attr();
        note.x = keyInfo.x;
        note.width = keyInfo.width;
        
        note.svg = draw.rect(note.width, note.height);
        note.svg.move(note.x, note.startY);
        note.svg.fill(blue);
        note.svg.stroke({color:black})
    });
}