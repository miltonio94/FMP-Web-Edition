function generatePiano(nBlack, nWhite, _width, _height, startingKeyNumber, draw){
    let piano = [];
    let width = _width / nWhite;;
    let height = _height / 6.0;
    let y = _height - height;

    for(let i = 0, x = 0; i < nBlack + nWhite; i++){
        if(!isKeySharp(i)){
            piano.push(createKey(i + startingKeyNumber, x * width, y, width, height, false, draw));
            x++;
        }
    }
    for(let i = 0, x = 0; i < nBlack + nWhite; i++){
        if(isKeySharp(i)){
            piano.push(createKey(i + startingKeyNumber, x * width, y, width * 0.5, height * 0.675, true, draw));
        }else{
            x++;
        }
    }
    
    return piano.sort((a, b) => a.attr().keyNumber - b.attr().keyNumber);
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

function createKey(_keyNumber, x, y, width, height, isSharp, draw){
    
    let key;   

    if(isSharp){
        key = draw.rect(width, height).move(x - (width / 2), y).fill("black");

    }else{    
        key = draw.rect(width, height).move(x, y).fill("#fff").stroke({color : "#000"})
    }

    key.attr({'isSharp':isSharp});
    key.attr({'pressed' : false});
    key.attr({'keyNumber' :_keyNumber});

    return key;

}