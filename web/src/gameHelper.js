// creating states for the game. the value of these don't actually matter all that much so i just used rrandom phrases that came to mind
const COUNTDOWN = 'ITS THE FINAL COUNTDOWN!!!!';
const PLAYING = 'DONT HATE THE PLAYER HATE THE GAME'; // find a musical reference for this state
const PAUSED = 'STOP! COLLABORATE AND LISTEN';
const ENDGAME = "WE'RE IN THE END GAME NOW"; // find a musical reference for this state
const NO_MIDI_SUPPORT = "Y U NO USE CHROME"; // find a musical reference for this state
const NO_MIDI = "PLUG IT IN";

const HIT_THREASHOLD = 10;

function updateGameStats(notes){
    let misses = 0; 
    let hit = 0; 
    let accuracy = 0;

    notes.forEach(n => {
        // if(n.status === HIT){
        //     hit++;
        // } else if(n.status === MISSED){
        //     misses++;
        // }
    });

    accuracy = (notes.length / hit) * 100;

    accuracy = accuracy === Infinity ? 0 : accuracy;

    return {hit, misses, accuracy};
}