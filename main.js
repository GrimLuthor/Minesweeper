"use strict"

var gBoard;
var SIZE = 36

var gNumOfMines = 10

var gGame = {
    isOn: false,
    clickedOnce: false,
    markedCount: 0,
}

function init(){
    displayHearts()

    gBoard = buildBoard()

    renderBoard()

    console.log(gBoard)
}

function buildBoard(){
    var board = []
    for(var i = 0; i <  Math.sqrt(SIZE); i++){
        var row = []
        for(var j = 0; j <  Math.sqrt(SIZE); j++){
            row.push(createCell())
        }
        board.push(row)
    }

    return board
}

function createCell(){
    return {
        minesAroundCount: 0,
        isShown: false, //TODO: work on that instead of DOM
        isMine: false,
        isMarked: false
    }
}



function cellClicked(cell,i,j){
    if(!gGame.clickedOnce){
        gGame.isOn = true
        gGame.clickedOnce = true
        addMines(i,j)
        updateMinesAroundCount()
        startTime()
    }
    if(gGame.isOn){


        if(!cell.classList.contains("hidden")){
            return
        }

        if(gBoard[i][j].isMine){
            cell.classList.add('mine')
        }
        show(cell)

        if(cell.classList.contains('mine')){
            deductHeart()
        }else{
            numColor(cell,i,j)
        }
    }
}

function show(cell){
    cell.classList.remove("hidden") //Change to gBoard index
    if(cell.classList.contains('mine')){
        cell.innerHTML = `<img src="img/mine.png"/>`
    }
}

function updateMinesAroundCount(){
    for(var i = 0; i < Math.sqrt(SIZE); i++){
        for(var j = 0; j < Math.sqrt(SIZE); j++){
            gBoard[i][j].minesAroundCount = getMineNegsCount(i,j)
        }
    }
}

function getMineNegsCount(i,j){
    var count = 0
    for(var x = i-1; x < i + 2; x++){
        if(x < 0 || x > Math.sqrt(SIZE)-1){
            continue;
        }
        for(var y = j-1; y < j + 2; y++){
            if(y < 0 || y > Math.sqrt(SIZE)-1){
                continue;
            }
            if(x===i&&y===j){
                continue;
            }
            if(gBoard[x][y].isMine){
                count++
            }
        }
    }
    return count

}

function addMines(m,l){
    for(var k = 0; k < gNumOfMines; k++){
        var notMines = []
        for(var i = 0; i < gBoard.length; i++){
            for(var j = 0; j < gBoard.length; j++){
                if(i===m&&l===j){
                    continue;
                }
                if(!gBoard[i][j].isMine){
                    notMines.push(gBoard[i][j])
                }
            }
        }

        var idx = getRandomIntInclusive(0,notMines.length-1)
        notMines[idx].isMine = true
    }
}

function rOpenTiles(i,j){
    for(var x = i - 1; x < i+2; x++){
        if(x < 0 || x > Math.sqrt(SIZE)-1){
            continue;
        }
        for(var y = j - 1; y < j+2; y++){
            if(y < 0 || y > Math.sqrt(SIZE)-1){
                continue;
            }
            if(x===i&&y===j){
                continue;
            }
            var currCell = document.querySelector(`.cell-${x}-${y}`);
            if(!currCell.classList.contains('hidden')){
                continue
            }
            show(currCell)
            if(gBoard[x][y].minesAroundCount === 0){
                rOpenTiles(x,y)
            }else{
                numColor(currCell,x,y)
            }
        }
    }
}

function numColor(cell,i,j){
    var num = gBoard[i][j].minesAroundCount
    if(num>0){
        cell.innerText = num
        switch(num){
            case 1:
                cell.style.color = 'blue'
                break;
            case 2:
                cell.style.color = 'green'
                break;
            case 3:
                cell.style.color = 'red'
                break;
            case 4:
                cell.style.color = 'purple'
                break;
            case 5:
                cell.style.color = 'orange'
                break;
            case 6:
                cell.style.color = 'darkblue'
                break;
            case 7:
                cell.style.color = 'yellowgreen'
                break;
            case 8:
                cell.style.color = 'brown'
                break;
        }
    }else{
        rOpenTiles(i,j)
    }
}

function gameOver(){
    clearInterval(gPlayTime)
    gPlayTime = 0
    var elTimer = document.querySelector('.timer')
    elTimer.innerText = 'Game Over!'
    gGame.isOn = false
}


function deductHeart(){
    gHearts--
    displayHearts()
    if(gHearts === 0){
        gameOver()
    }
}

function mark(cell,i,j){
    if(gBoard[i][j].isMarked){
        gBoard[i][j].isMarked = false
        cell.innerHTML = ''
    }else{
        gBoard[i][j].isMarked = true
        cell.innerHTML = `<img src="img/flag.png"/>`
    }
}



