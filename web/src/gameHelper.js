function updateGameStats(notes){
    let entryMiss = 0; 
    let exitMiss = 0; 
    let entryHit = 0; 
    let exitHit = 0;
    let entryAccuracy = 0;
    let exitAccuracy = 0;
    let accuracy = 0;

    notes.forEach(n => {
        if(n.enterStat === HIT){
            entryHit++;
        } 
        if(n.exitStat === HIT){
            exitHit++;
        }
        if(n.enterStat === MISSED){
            entryMiss++;
        } 
        if(n.exitStat === MISSED){
            exitMiss++;
        }
    });

    entryAccuracy = (notes.length  / entryHit) * 100;
    exitAccuracy = (notes.length  / exitHit) * 100;

    // console.log(notes.length / entryHit);
    

    // console.log(`entry acc ${entryAccuracy} exit acc ${exitAccuracy}`);
    

    entryAccuracy = entryAccuracy === Infinity ? 0 : entryAccuracy;
    exitAccuracy = exitAccuracy === Infinity ? 0 : exitAccuracy;

    accuracy = (entryAccuracy + exitAccuracy) / 2;

    accuracy = accuracy === Infinity ? 0 : accuracy;

    return {entryHit, exitHit, entryMiss, exitMiss, entryAccuracy, exitAccuracy, accuracy};
}