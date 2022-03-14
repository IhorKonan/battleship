const bfplayer = document.querySelector('.app-battlefield-1');
const bfplayer2 = document.querySelector('.app-battlefield-2');
const ships = document.querySelector('.ships');
const random = document.querySelector('#random');
const passMove = document.querySelector('#pass');
const hideBf = document.querySelector('#hide');
const activePlayer = document.querySelector('.field_1');
const active = document.querySelector('.field_2');

const markersABC = [' ','A','B','C','D','E','F','G','H','I','J'];
const markers123 = ['1','2','3','4','5','6','7','8','9','10'];

let isActivePlayer1 = true;
let isGameOver = false;
let currentWon_1 = 0;
let currentWon_2 = 0;

let bfmatrpl = [];
let bfmatrpl2 = [];

let ships_elem = [];
let shipIsHave = [];
let shipDatas_1 = [
    { size: 1, direction: '', id: `#10`, x: '', y: '', state: 'alive'},
    { size: 1, direction: '', id: `#9`, x: ``, y: '', state: 'alive' },
    { size: 1, direction: '', id: `#8`, x: ``, y: '', state: 'alive' },
    { size: 1, direction: '', id: `#7`, x: ``, y: '', state: 'alive' },
    { size: 2, direction: '', id: `#6`, x: ``, y: '', state: 'alive' },
    { size: 2, direction: '', id: `#5`, x: ``, y: '', state: 'alive' },
    { size: 2, direction: '', id: `#4`, x: ``, y: '', state: 'alive' },
    { size: 3, direction: '', id: `#3`, x: ``, y: '', state: 'alive' },
    { size: 3, direction: '', id: `#2`, x: ``, y: '', state: 'alive' },
    { size: 4, direction: '', id: `#1`, x: ``, y: '', state: 'alive' }
]
let shipDatas_2 = [
    { size: 1, direction: '', id: `#10`, x: ``, y: '', state: 'alive'},
    { size: 1, direction: '', id: `#9`, x: ``, y: '', state: 'alive' },
    { size: 1, direction: '', id: `#8`, x: ``, y: '', state: 'alive' },
    { size: 1, direction: '', id: `#7`, x: ``, y: '', state: 'alive' },
    { size: 2, direction: '', id: `#6`, x: ``, y: '', state: 'alive' },
    { size: 2, direction: '', id: `#5`, x: ``, y: '', state: 'alive' },
    { size: 2, direction: '', id: `#4`, x: ``, y: '', state: 'alive' },
    { size: 3, direction: '', id: `#3`, x: ``, y: '', state: 'alive' },
    { size: 3, direction: '', id: `#2`, x: ``, y: '', state: 'alive' },
    { size: 4, direction: '', id: `#1`, x: ``, y: '', state: 'alive' }
]
let shipSizeId = [
    { size: 1, id: `#10`},
    { size: 1, id: `#9`},
    { size: 1, id: `#8`},
    { size: 1, id: `#7`},
    { size: 2, id: `#6`},
    { size: 2, id: `#5`},
    { size: 2, id: `#4`},
    { size: 3, id: `#3`},
    { size: 3, id: `#2`},
    { size: 4, id: `#1`}
]
let shipDatasCopyStart = [
    { size: 1, direction: '', id: `#10`, x: '', y: '', state: 'alive'},
    { size: 1, direction: '', id: `#9`, x: ``, y: '', state: 'alive' },
    { size: 1, direction: '', id: `#8`, x: ``, y: '', state: 'alive' },
    { size: 1, direction: '', id: `#7`, x: ``, y: '', state: 'alive' },
    { size: 2, direction: '', id: `#6`, x: ``, y: '', state: 'alive' },
    { size: 2, direction: '', id: `#5`, x: ``, y: '', state: 'alive' },
    { size: 2, direction: '', id: `#4`, x: ``, y: '', state: 'alive' },
    { size: 3, direction: '', id: `#3`, x: ``, y: '', state: 'alive' },
    { size: 3, direction: '', id: `#2`, x: ``, y: '', state: 'alive' },
    { size: 4, direction: '', id: `#1`, x: ``, y: '', state: 'alive' }
];






function createArr() {
    for (let i = 0; i < 10; i++) {
        let row = [];
        for (let j = 0; j < 10; j++) {
            row[j] = 0;
        }
        bfmatrpl.push(row);
    }
    for (let i = 0; i < 10; i++) {
        let row = [];
        for (let j = 0; j < 10; j++) {
            row[j] = 0;
        }
        bfmatrpl2.push(row);
    }
}

createArr();

function createRect() {
    for (let i = -1; i < 10; i++) {
        if(i === -1){
            markersABC.forEach(n => {
                let columnMarker = document.createElement('div');
                columnMarker.classList.add('marker-row');
                columnMarker.textContent = n;

                bfplayer.append(columnMarker);
            });
        } else {
            let rowMarker = document.createElement('div');
            rowMarker.classList.add('marker-column');
            rowMarker.textContent = markers123[i];

            bfplayer.append(rowMarker);
            for (let j = 0; j < 10; j++) {
                let rect = document.createElement('div');
                rect.classList.add('rect');
                rect.dataset.x = `${i}`;
                rect.dataset.y = `${j}`;
    
                bfplayer.append(rect);
            }
        }
    }
    for (let i = -1; i < 10; i++) {
        if(i === -1){
            markersABC.forEach(n => {
                let columnMarker = document.createElement('div');
                columnMarker.classList.add('marker-row');
                columnMarker.textContent = n;

                bfplayer2.append(columnMarker);
            });
           
        } else {
            let rowMarker = document.createElement('div');
            rowMarker.classList.add('marker-column');
            rowMarker.textContent = markers123[i];

            bfplayer2.append(rowMarker);
            for (let j = 0; j < 10; j++) {
                let rect = document.createElement('div');
                rect.classList.add('rect');
                rect.dataset.x = `${i}`;
                rect.dataset.y = `${j}`;
    
                bfplayer2.append(rect);
            }
        }
    }
}

createRect();

function randomInteger(min, max) {
    let rand = min + Math.random() * (max - min);
    return Math.floor(rand);
}


function placeShipsRandomly(bfToFill, bfId, shipDatas) {
    let shipsDataCopy = [...shipDatasCopyStart];
    let isShipsNotReady = true;
    while (isShipsNotReady) {
        if (shipsDataCopy.length > 0) {
            let x = randomInteger(0, 10);
            let y = randomInteger(0, 10);
            let direction = randomInteger(0, 2);
            let currentShip = shipsDataCopy.at(-1);
            let shipIndex = shipDatas.findIndex((obj => obj.id == currentShip.id));
            if (direction == 0 && y + currentShip.size < 10 && canPlaceShip(bfToFill, direction, x, y, currentShip.size)) {
                shipDatas[shipIndex].y = `${y}`;
                for (let i = 0; i < currentShip.size; i++) {
                    bfToFill[x][y + i] = 1;
                    bfId.querySelector(`.rect[data-x="${x}"][data-y="${y + i}"]`).setAttribute(`data-id`, `${currentShip.id}`);
                    shipDatas[shipIndex].direction = 'row';
                    shipDatas[shipIndex].x = `${x}`;
                }
                wrapperShip(bfToFill, x, y, currentShip.size, direction);
                shipsDataCopy.pop();
            } else if (direction == 1 && x + currentShip.size < 10 && canPlaceShip(bfToFill, direction, x, y, currentShip.size)) {
                shipDatas[shipIndex].x = `${x}`;
                for (let i = 0; i < currentShip.size; i++) {
                    bfToFill[x + i][y] = 1;
                    bfId.querySelector(`.rect[data-x="${x + i}"][data-y="${y}"]`).setAttribute(`data-id`, `${currentShip.id}`);
                    shipDatas[shipIndex].direction = 'column';
                    shipDatas[shipIndex].y = `${y}`;
                }
                wrapperShip(bfToFill, x, y, currentShip.size, direction);
                shipsDataCopy.pop();
            }
        } else {
            isShipsNotReady = false;
            shipsDataCopy = [...shipDatasCopyStart];
        }
    }
}

function canPlaceShip(bfToFill, direction, x, y, size) {
    if (direction == 1) {
        for (let i = x; i < x + size; i++) {
            if (bfToFill[i][y] !== 0) {
                return false;
            }
        }
        return true;
    } else {
        for (let i = y; i < y + size; i++) {
            if (bfToFill[x][i] !== 0) {
                return false;
            }
        }
        return true;
    }
}

function drawBattlefield(bf, matr) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let currentRect = bf.querySelector(`.rect[data-x="${i}"][data-y="${j}"]`);
            switch (matr[i][j]) {
                case 3: currentRect.style.backgroundColor = "red";
                    break;
                case 8: currentRect.style.backgroundColor = "rgb(122, 40, 40)";
                    break;
                case 1: currentRect.style.backgroundColor = "rgb(36, 178, 255)";
                    break;
                case 7: currentRect.style.backgroundColor = "grey";
                    break;
                default: currentRect.style.backgroundColor = "white";
                    break;
            }
        }
    }
} 

function drawTarget(bf, matr) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let currentRect = bf.querySelector(`.rect[data-x="${i}"][data-y="${j}"]`);
            switch (matr[i][j]) {
                case 3: currentRect.style.backgroundColor = "red";
                    break;
                case 8: currentRect.style.backgroundColor = "rgb(122, 40, 40)";
                    break;
                case 7: currentRect.style.backgroundColor = "grey";
                    break;
                default: currentRect.style.backgroundColor = "white";
                    break;
            }
        }
    }
}

function clear(bf) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            bf[i][j] = 0;
        }
    }
}

random.addEventListener("click", function () {

    if(random.innerHTML == 'Random'){
        isActivePlayer1 = true;
        isGameOver = 0;
        active.innerHTML = 'Action: shot';
        random.innerHTML = 'Reset game';

        clear(bfmatrpl);
        clear(bfmatrpl2);

        placeShipsRandomly(bfmatrpl, bfplayer, shipDatas_1);
        placeShipsRandomly(bfmatrpl2, bfplayer2, shipDatas_2);

        playGame();  
    }else if(random.innerHTML == 'Reset game'){
        location.reload();
    }
    


});

function startGame(bf, bfmat, shipDatas) {
    bf.addEventListener("click", function (event) {

        let temp = event.target;
        let tempX = temp.getAttribute("data-x");
        let tempY = temp.getAttribute("data-y");
        let shipSizeIdCopy = shipSizeId;

        if (bfmat[tempX][tempY] == 1 || bfmat[tempX][tempY] == 8 || bfmat[tempX][tempY] == 3) {
            let tempId = temp.getAttribute("data-id");
            let tempIndex = shipDatas.findIndex((obj => obj.id == tempId));
            let tempDirect = shipDatas[tempIndex].direction;
  
            if(shipDatas[tempIndex].size <= 1){
                if(tempDirect == 'row'){
                    for(let i = +shipDatas[tempIndex].y; i <= +shipDatas[tempIndex].y + shipSizeIdCopy[tempIndex].size - 1; i++){
                        bfmat[tempX][i] = 3;
                    }
                    active.innerHTML = 'Action: ';
                    let activeHit = `killed`;
                    active.innerHTML += `${activeHit}`;
                    isActivePlayer1 = isActivePlayer1;
                    drawTarget(bf, bfmat);
                }else if(tempDirect == 'column'){
                    for(let i = +shipDatas[tempIndex].x; i <= +shipDatas[tempIndex].x + shipSizeIdCopy[tempIndex].size - 1; i++){
                        bfmat[i][tempY] = 3; 
                    }
                    active.innerHTML = 'Action: ';
                    let activeHit = `killed`;
                    active.innerHTML += `${activeHit}`;
                    isActivePlayer1 = isActivePlayer1;
                    drawTarget(bf, bfmat);  
                }
                shipDatas[tempIndex].size -= 1;
            } else if(shipDatas[tempIndex].size > 1){
                bfmat[tempX][tempY] = 8;
                shipDatas[tempIndex].size -= 1;
                active.innerHTML = 'Action: ';
                let activeHit = `wounded`;
                active.innerHTML += `${activeHit}`;
                isActivePlayer1 = isActivePlayer1;
                drawTarget(bf, bfmat);
            }

        } else if (bfmat[tempX][tempY] == 7) {
            isActivePlayer1 = isActivePlayer1;
        } else if (bfmat[tempX][tempY] == 2 || bfmat[tempX][tempY] == 0) {
            bfmat[tempX][tempY] = 7;
            active.innerHTML = 'Action: ';
            let activeMiss = `miss (click - Hide battlefields)`;
            active.innerHTML += `${activeMiss}`;
            isActivePlayer1 = !isActivePlayer1;
            drawTarget(bf, bfmat);
        }
            
        if (event) {
            pause();
        } 
        this.removeEventListener("click", arguments.callee, false); 
    }, false);
}

function wrapperShip(bf, x, y, size, direction) {
    if (direction == 0 && y + size < 10) {
        for (let i = x - 1; i < x + 2; i++) {
            for (let j = y - 1; j < y + size + 1; j++) {
                if (i >= 0 && i <= 9 && j >= 0 && j <= 9 && bf[i][j] == 0) {
                    bf[i][j] = 2;
                }
            }
        }
    } else if (direction == 1 && x + size < 10) {
        for (let i = x - 1; i < x + size + 1; i++) {
            for (let j = y - 1; j < y + 2; j++) {
                if (i >= 0 && i <= 9 && j >= 0 && j <= 9 && bf[i][j] == 0) {
                    bf[i][j] = 2;
                }
            }
        }
    }
}

function checkWon (bfmatr, currentWon){
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (bfmatr[i][j] == 3){
                currentWon++;
                if(currentWon == 20){
                    if(isActivePlayer1 == isActivePlayer1){
                        active.innerHTML = 'Action: ';
                        let activeWon = `winner - ${activePlayer.innerHTML}`;
                        active.innerHTML += `${activeWon}`;
                        isGameOver = true;
                    } else{
                        active.innerHTML = 'Action: ';
                        let activeWon = `winner - ${activePlayer.innerHTML}`;
                        active.innerHTML += `${activeWon}`;
                        isGameOver = true;
                    }
                }
            }
        }
    }
}

function playGame() {
    if (isGameOver == false) {
        if (isActivePlayer1) {

            activePlayer.innerHTML = `Player :  `
            let activePl = '1';
            activePlayer.innerHTML = `${activePlayer.innerHTML} ${activePl}`;

            drawBattlefield(bfplayer, bfmatrpl);
            drawTarget(bfplayer2, bfmatrpl2);
            startGame(bfplayer2, bfmatrpl2, shipDatas_2);
            checkWon(bfmatrpl2, currentWon_1);
        } else {

            activePlayer.innerHTML = `Player :  `
            let activePl = '2';
            activePlayer.innerHTML = `${activePlayer.innerHTML} ${activePl}`;

            drawBattlefield(bfplayer2, bfmatrpl2);
            drawTarget(bfplayer, bfmatrpl);
            startGame(bfplayer, bfmatrpl, shipDatas_1);
            checkWon(bfmatrpl, currentWon_2);
        }
        isGameOver = isGameOver;  
    } else{
        return isGameOver;
    }
    
}

function hideViewBf(bf, matr){
       for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let currentRect = bf.querySelector(`.rect[data-x="${i}"][data-y="${j}"]`);
            switch (matr[i][j]) {
                case 8: currentRect.style.backgroundColor = "rgb(122, 40, 40)";
                    break;
                case 7: currentRect.style.backgroundColor = "grey";
                    break;
                default: currentRect.style.backgroundColor = "white";
                    break;
            }
        }
    } 
}

function pause(){
    if(isGameOver == false){
        if (active.innerHTML == 'Action: miss (click - Hide battlefields)') {
                hideBf.addEventListener('click', function(event){
                if (event) {
                    hideViewBf(bfplayer, bfmatrpl);
                    hideViewBf(bfplayer2, bfmatrpl2);
                    active.innerHTML = 'Action: click - Pass move';

                    passMove.addEventListener('click', function(event){
                        if (event) {
                            active.innerHTML = 'Action: shot';
                            playGame();
                        }
                        this.removeEventListener("click", arguments.callee, false);
                    }, false);

                }
                this.removeEventListener("click", arguments.callee, false);
            }, false);
        }else if(active.innerHTML == 'Action: wounded' || active.innerHTML == 'Action: killed'){
            checkWon(bfmatrpl, currentWon_1);
            checkWon(bfmatrpl2, currentWon_2);
            if(isGameOver == true){
                drawBattlefield(bfplayer, bfmatrpl);
                drawBattlefield(bfplayer2, bfmatrpl2);
            }else{
                playGame();
            }
        }
    }else{
        return isGameOver = true;
    }
}
