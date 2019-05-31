const LEFT_HAND = 'LEFT';
const RIGHT_HAND = 'RIGHT';

const FINGER1_NAME = 'thumb';
const FINGER2_NAME = 'index';
const FINGER3_NAME = 'middle';
const FINGER4_NAME = 'ring';
const FINGER5_NAME = 'pinky';

const LEFT_FINGER1_CODE = 'L1';
const LEFT_FINGER2_CODE = 'L2';
const LEFT_FINGER3_CODE = 'L3';
const LEFT_FINGER4_CODE = 'L4';
const LEFT_FINGER5_CODE = 'L5';

const RIGHT_FINGER1_CODE = 'R1';
const RIGHT_FINGER2_CODE = 'R2';
const RIGHT_FINGER3_CODE = 'R3';
const RIGHT_FINGER4_CODE = 'R4';
const RIGHT_FINGER5_CODE = 'R5';


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

function fingerNameToCode(name, side){
    let code = '';
    if(name === FINGER1_NAME && side === LEFT_HAND){
        code = LEFT_FINGER1_CODE;
    }else if(name === FINGER2_NAME && side === LEFT_HAND){
        code = LEFT_FINGER2_CODE;
    }else if(name === FINGER3_NAME && side === LEFT_HAND){
        code = LEFT_FINGER3_CODE;
    }else if(name === FINGER4_NAME && side === LEFT_HAND){
        code = LEFT_FINGER4_CODE;
    }else if(name === FINGER5_NAME && side === LEFT_HAND){
        code = LEFT_FINGER5_CODE;
    }
    
    else if(name === FINGER1_NAME && side === RIGHT_HAND){
        code = RIGHT_FINGER1_CODE;
    }else if(name === FINGER2_NAME && side === RIGHT_HAND){
        code = RIGHT_FINGER2_CODE;
    }else if(name === FINGER3_NAME && side === RIGHT_HAND){
        code = RIGHT_FINGER3_CODE;
    }else if(name === FINGER4_NAME && side === RIGHT_HAND){
        code = RIGHT_FINGER4_CODE;
    }else if(name === FINGER5_NAME && side === RIGHT_HAND){
        code = RIGHT_FINGER5_CODE;
    }

    return code;
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
    leftHand = createHand(LEFT_HAND);
    rightHand = createHand(RIGHT_HAND);

    return{leftHand, rightHand};
}

function whatFingerIsDown(hands){
    let fingers = [];

    if(hands.leftHand.finger1.isDown){
        fingers.push('L1');
    }
    if(hands.leftHand.finger2.isDown){
        fingers.push('L2');
    }
    if(hands.leftHand.finger3.isDown){
        fingers.push('L3');
    }
    if(hands.leftHand.finger4.isDown){
        fingers.push('L4');
    }
    if(hands.leftHand.finger5.isDown){
        fingers.push('L5');
    }

    if(hands.rightHand.finger1.isDown){
        fingers.push('R1');
    }
    if(hands.rightHand.finger2.isDown){
        fingers.push('R2');
    }
    if(hands.rightHand.finger3.isDown){
        fingers.push('R3');
    }
    if(hands.rightHand.finger4.isDown){
        fingers.push('R4');
    }
    if(hands.rightHand.finger5.isDown){
        fingers.push('R5');
    }

    return fingers;
}