
const fingerDown = (fingerNumber) =>{
    console.log("finger " + fingerNumber + " is down");
    switch(fingerNumber){
        case 1:
            hands.leftHand.finger1.isDown = true;
            break;
        case 2:
            hands.leftHand.finger2.isDown = true;
            break;
        case 3:
            hands.leftHand.finger3.isDown = true;
            break;
        case 4:
            hands.leftHand.finger4.isDown = true;
            break;
        case 5:
            hands.leftHand.finger5.isDown = true;
            break;
        case 6:
            hands.rightHand.finger1.isDown = true;
            break;
        case 7:
            hands.rightHand.finger2.isDown = true;
            break;
        case 8:
            hands.rightHand.finger3.isDown = true;
            break;
        case 9:
            hands.rightHand.finger4.isDown = true;
            break;
        case 10:
            hands.rightHand.finger5.isDown = true;            
            break;
    }
    
}
const fingerUp = (fingerNumber, hands) =>{
    console.log("finger " + fingerNumber + " is up");
    switch(fingerNumber){
        case 1:
            hands.leftHand.finger1.isDown = false;
            break;
        case 2:
            hands.leftHand.finger2.isDown = false;
            break;
        case 3:
            hands.leftHand.finger3.isDown = false;
            break;
        case 4:
            hands.leftHand.finger4.isDown = false;
            break;
        case 5:
            hands.leftHand.finger5.isDown = false;
            break;
        case 6:
            hands.rightHand.finger1.isDown = false;
            break;
        case 7:
            hands.rightHand.finger2.isDown = false;
            break;
        case 8:
            hands.rightHand.finger3.isDown = false;
            break;
        case 9:
            hands.rightHand.finger4.isDown = false;
            break;
        case 10:
            hands.rightHand.finger5.isDown = false;
            break;
    }
}

function createHand(leftOrRight){
    let hand = {
        finger1: {
            isDown: false,
            fingerName: 'thumb'
        },
        finger2 : {
            isDown: false,
            fingerName: 'index'
        },
        finger3 : {
            isDown: false,
            fingerName: 'middle'
        },
        finger4 : {
            isDown: false,
            fingerName: 'ring'
        },
        finger5 :{
            isDown: false,
            fingerName: 'pinky'
        },
        handSide : leftOrRight,
    }
    return hand;
}

function createHands(){
    leftHand = createHand('left');
    rightHand = createHand('right');

    return{leftHand, rightHand};
}

function whatFingerIsDown(hands){
    let finger = [];


}