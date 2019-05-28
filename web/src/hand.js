
const fingerDown = (fingerNumber) =>{
    console.log("finger " + fingerNumber + " is down");
    
}
const fingerUp = (fingerNumber) =>{
    console.log("finger " + fingerNumber + " is up");
}

function createHand(leftOrRight){
    let hand = {
        thunb: {
            isDown: false
        },
        index : {
            isDown: false
        },
        middle : {
            isDown: false
        },
        ring : {
            isDown: false
        },
        pinky :{
            isDown: false
        },
        handSide : leftOrRight,
        hand : ''
    }
}