function generatePiano(nBlack, nWhite, _width, _height, startingKeyNumber, draw){
    let piano = [];
    let width = _width / nWhite;
    let begginingX = _width * .10;
    
    let height = _height / 6.0;
    let y = _height - height;

    for(let i = 0, x = 0; i < nBlack + nWhite; i++){
        if(!isKeySharp(i)){
            piano.push(createKey(i + startingKeyNumber, (x * width) + begginingX, y, width, height, false, draw));
            x++;
        }
    }
    for(let i = 0, x = 0; i < nBlack + nWhite; i++){
        if(isKeySharp(i)){
            piano.push(createKey(i + startingKeyNumber,( x * width) + begginingX, y + 3.5, (width * 0.45), height * 0.675, true, draw));
        }else{
            x++;
        }
    }
    
    return piano.sort((a, b) => a.attr().keyNumber - b.attr().keyNumber);
}

function generateLines(nWhite, _width, _height, _startX, draw){
    let lanes = [];
    let width = _width / nWhite;
    let begginingX = _width /10;
    
    lanes.push(draw.line(_startX, 0, _startX, _height).stroke({ color: "#444748", width: 2, linecap: 'round' }))
    lanes.push(draw.line(_startX + (nWhite * width), 0, _startX + (nWhite * width), _height).stroke({ color: "#444748", width: 2, linecap: 'round' }))

    for (let i = 3; i < nWhite; i += 7) {
        let startX = (i * width);
        let startY = 0;
        let endX = startX;
        let endY = _height;
        lanes.push(draw.line(startX +_startX, startY, endX +_startX, endY)
             .stroke({ color: "#444748", width: 2, linecap: 'round' }));
    }

    for (let i = 7; i < nWhite; i += 7) {
        let startX = (i * width);
        let startY = 0;
        let endX = startX;
        let endY = _height;
        lanes.push(draw.line(startX +_startX, startY, endX +_startX, endY)
             .stroke({ color: "#444748", width: 2, linecap: 'round' }));
    }    

    return lanes.sort(((l1, l2) => {
        if(l1.x() < l2.x()){
            return -1
        }
        if(l1.x() > l2.x()){
            return 1
        }

        return 0
    }));;
}

function pianoResize(_width, _height, numbWhites, N_BLACK, piano){
    let newWhiteKeyWidth = _width / numbWhites;
    let newBlackKeyWidth = newWhiteKeyWidth * 6.5;

    piano.forEach(key => {
        
    });
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
        key = draw.rect(width, height).move(x - (width / 2), y).fill(black);
    }else{
        key = draw.rect(width, height).move(x, y).fill(white).stroke({color : black})
    }

    key.attr({isSharp});
    key.attr({'pressed' : false});
    key.attr({'keyNumber' :_keyNumber});

    return key;
}