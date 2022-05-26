"use strict"

var gBoard;
var SIZE = 25

var gNumOfMines = 3

var undoList = []

var isCreatorTest = false

var gGame = {
    isOn: false,
    clickedOnce: false,
    discroveredCells: 0
}

function init(){
    displayHearts()
    if(isCreatorTest){
        var copy = JSON.parse(JSON
            .stringify(editedBoard)
        )
        gBoard = copy
    }else{
     gBoard = buildBoard()
    }  

    renderBoard()

    displayMineCount()

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
        if(!isCreatorTest){
            addMines(i,j)
        }
        updateMinesAroundCount()
        startTime()
    }
    if(gBoard[i][j].isMarked){
        return
    }
    if(gGame.isOn){
        if(!cell.classList.contains("hidden")){
            return
        }

        if(gBoard[i][j].isMine){
            cell.classList.add('mine')
            gGame.explodedCount++
            steppedOnMine()
        }
        undoList = []
        undoList.push({undoItem: gBoard[i][j],idxI: i,idxJ: j})
        show(cell,i,j)

        if(cell.classList.contains('mine')){
            deductHeart()
        }else{
            numColor(cell,i,j)
        }
        checkIfWon()
    }
}

function show(cell,i,j){
    cell.classList.remove("hidden") //Change to gBoard index
    if(cell.classList.contains('mine')){
        cell.innerHTML = `<img src="img/mine.png"/>`
    }else if(!gBoard[i][j].isShown){
        gGame.discroveredCells++
    }
    gBoard[i][j].isShown = true
}

function updateMinesAroundCount(){
    for(var i = 0; i < gBoard.length; i++){
        for(var j = 0; j < gBoard[0].length; j++){
            gBoard[i][j].minesAroundCount = getMineNegsCount(i,j)
        }
    }
}

function getMineNegsCount(i,j){
    var count = 0
    for(var x = i-1; x < i + 2; x++){
        if(x < 0 || x > gBoard.length-1){
            continue;
        }
        for(var y = j-1; y < j + 2; y++){
            if(y < 0 || y > gBoard[0].length-1){
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
        for(var i = 0; i < gBoard[0].length; i++){
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
        if(x < 0 || x > gBoard.length-1){
            continue;
        }
        for(var y = j - 1; y < j+2; y++){
            if(y < 0 || y > gBoard.length-1){
                continue;
            }
            if(x===i&&y===j){
                continue;
            }
            
            if(gBoard[x][y].isShown){
                continue
            }
            var currCell = document.querySelector(`.cell-${x}-${y}`);
            show(currCell,x,y)
            undoList.push({undoItem: gBoard[x][y],idxI: x,idxJ: y})
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
        show(cell,i,j)
    }else{
        rOpenTiles(i,j)
    }
}

function gameOver(haveWon){
    clearInterval(gPlayTime)
    gPlayTime = 0
    var elTimer = document.querySelector('.timer')
    if(haveWon){
        elTimer.innerText += '\nYou Won!'
        smileWon()
    }else{
        elTimer.innerText += '\nGame Over!'
    }
    showMines(haveWon)
    gGame.isOn = false
}


function mark(cell,i,j){
    if(gGame.isOn&&cell.classList.contains('hidden')){
        if(gBoard[i][j].isMarked){
            gBoard[i][j].isMarked = false
            cell.innerHTML = ''
        }else{
            gBoard[i][j].isMarked = true
            cell.innerHTML = `<img src="img/flag.png"/>`
        }
    }
    
}

function checkIfWon(){
    if(gGame.discroveredCells === (gBoard.length*gBoard.length)-gNumOfMines){
        gameOver(true)
    }
}

function showMines(haveWon){
    for(var i = 0; i < gBoard.length; i++){
        for(var j = 0; j < gBoard[0].length; j++){
            if(gBoard[i][j].isMine){
                var elMine = document.querySelector(`.cell-${i}-${j}`)
                elMine.classList.remove('hidden')
                elMine.innerHTML = '<img src="img/mine.png"/>'
                if(haveWon){
                    elMine.classList.add('win-mine')
                }

            }
        }
    }
}




