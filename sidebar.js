"use strict"
const HEART = '<img src="img/heart2.png" />'

var gHearts = 3

var gSafeClicks = 3

var gPlayTime = 0

var gHintMode = {isHintMode: false, gHintCount: 3}
var hintTimeout;


function displayHearts(){
    var heartStr = ''
    for(var i = 0; i < gHearts; i++){
        heartStr +=HEART
    }
    var heartBar = document.querySelector('.hearts')
    heartBar.innerHTML = heartStr
}

function deductHeart(){
    gHearts--
    displayHearts()
    if(gHearts === 0){
        gameOver(false)
    }
}

function startTime(){
    var start = Date.now()

    var elTimer = document.querySelector('.timer')
    gPlayTime = setInterval(()=>{
        var time = Date.now()-start
        elTimer.innerText = time/1000+'s'

    },1)
}

function safeClick(button){
    if(gGame.isOn&&gSafeClicks>0){
        var notMines = []
        for(var i = 0; i < gBoard[0].length; i++){
            for(var j = 0; j < gBoard.length; j++){
                if(!gBoard[i][j].isMine&&!gBoard[i][j].isShown){
                    notMines.push({onBoard: gBoard[i][j],idxI: i,idxJ: j})
                }
            }
        }

        var randomIdx = getRandomIntInclusive(0,notMines.length-1)
        var num = notMines[randomIdx].onBoard.minesAroundCount
        var cell = document.querySelector(`.cell-${notMines[randomIdx].idxI}-${notMines[randomIdx].idxJ}`);
        cell.innerText = num
        switch(num){
            case 0:
                cell.style.color = 'yellow'
                break;
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
        gSafeClicks--
        button.innerText = 'Safe Click * '+gSafeClicks

        setTimeout(()=>{cell.innerText = ''},1500)
    }
}



var difDisplayed = false
function displayDifficulty(){
    if(!gGame.isOn){
        var difBar = document.querySelector('.popup-dif')
        if(!difDisplayed){
            difBar.style.display = 'block'
            difDisplayed = !difDisplayed
        }else{
            difBar.style.display = 'none'
            difDisplayed = !difDisplayed
        }
    }
}

function setDifficulty(size,mines){
    if(isCreatorTest||inCreatorMode) return
    SIZE = size
    gNumOfMines = mines
    restart()
    var difBar = document.querySelector('.popup-dif')
    difBar.style.display = 'none'
    difDisplayed = !difDisplayed
}


function undo(){
    if(gGame.isOn&&undoList.length>0){
        for(var i = 0; i < undoList.length; i++){
            undoList[i].undoItem.isShown = false
            var elCell = document.querySelector(`.cell-${undoList[i].idxI}-${undoList[i].idxJ}`);
            elCell.classList.add('hidden')
            elCell.innerText =''
            if(elCell.classList.contains('mine')){
                elCell.innerHTML = ''
                gHearts++
                displayHearts()
            }else{
                gGame.discroveredCells-=undoList.length
            }
        }
        undoList = []  
    }
}

function displayMineCount(){
    var elMineDisplay = document.querySelector('.minecount')
    elMineDisplay.innerText = '💣*'+gNumOfMines
}

function hint(elButton){
    if(!gGame.isOn) return

    if(gHintMode.gHintCount === 0) return

    gHintMode.isHintMode = true
 
    gHintMode.gHintCount--

    elButton.innerText = 'Hint * '+gHintMode.gHintCount
}


function hintClick(i,j){
    var hinted = []
    for(var x = i-1; x < i+2; x++){
        if(x < 0 || x > gBoard.length-1){
            continue;
        }
        for(var y = j-1; y < j+2; y++){

            if(y < 0 || y > gBoard[0].length-1){
                continue;
            }
            var elCell = document.querySelector(`.cell-${x}-${y}`);

            if(elCell.classList.contains('hidden')){
                if(gBoard[x][y].isMine){
                    elCell.innerHTML = '<img src="img/mine.png" />'
                }else{
                    var num = gBoard[x][y].minesAroundCount
                    elCell.innerText = num
                    switch(num){
                        case 1:
                            elCell.style.color = 'blue'
                            break;
                        case 2:
                            elCell.style.color = 'green'
                            break;
                        case 3:
                            elCell.style.color = 'red'
                                break;
                        case 4:
                            elCell.style.color = 'purple'
                            break;
                        case 5:
                            elCell.style.color = 'orange'
                            break;
                        case 6:
                            elCell.style.color = 'darkblue'
                            break;
                        case 7:
                            elCell.style.color = 'yellowgreen'
                            break;
                        case 8:
                            elCell.style.color = 'brown'
                            break;
                    }

                }
                hinted.push({board: gBoard[x][y], idxX: x, idxY: y})
            }
        }
        setTimeout(()=>{
            for(var i = 0; i < hinted.length; i++){
                var elCell = document.querySelector(`.cell-${hinted[i].idxX}-${hinted[i].idxY}`);
                if(elCell.classList.contains('hidden')){
                    if(hinted[i].board.isMine){
                        elCell.innerHTML = ''
                    }else{
                        elCell.innerText = ''
                    }
                }
                if(elCell.innerText==0){
                    elCell.innerText = ''
                }
            }

        },1000)

        gHintMode.isHintMode = false
    }

}