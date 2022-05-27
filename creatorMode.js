"use strict"

var inCreatorMode = false

var creatorSize = 0

var createdMines = 0

var editedBoard;

function workingGround(){
    editedBoard = []
    for(var i = 0; i <  Math.sqrt(creatorSize); i++){
        var row = []
        for(var j = 0; j <  Math.sqrt(creatorSize); j++){
            row.push(createCell())
        }
        editedBoard.push(row)
    }
}

function renderWorkingGround(){
    var strHTML = '<table class="table" border="1"><tbody>';
    for (var i = 0; i < editedBoard.length; i++) {
      strHTML += '<tr>';
      for (var j = 0; j < editedBoard[0].length; j++) {
        var className = 'cell cell-' + i + '-' + j;
        strHTML += `<td class="${className}" onclick="edit(this,${i},${j})"></td>`
      }
      strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(".board-container");
    elContainer.innerHTML = strHTML;
}

function edit(cell,i,j){
    if(editedBoard[i][j].isMine){
        cell.innerHTML = ''
        editedBoard[i][j].isMine = false
        createdMines-- 

    }else{
        cell.innerHTML = `<img src="img/mine.png"/>`
        editedBoard[i][j].isMine = true
        createdMines++
    }

    var elMineDisplay = document.querySelector('.minecount')
    elMineDisplay.innerText = '💣*'+createdMines

}

function enterCreatorMode(size){
    closeAll()

    var testBtn = document.querySelector('.test')
    testBtn.style.display = 'block'

    var elTimer = document.querySelector('.timer')
    elTimer.innerText = 'Creator Mode'

    var elMineDisplay = document.querySelector('.minecount')
    elMineDisplay.innerText = '💣*'+createdMines

    var elSmile = document.querySelector('.smile')
    elSmile.innerHTML = CONSTRUCTOR
    inCreatorMode = true
    creatorSize = size
    workingGround()
    renderWorkingGround()

}

var sizeDisplayed = false
function displayCreatorSize(){
    if(!gGame.isOn&&!isCreatorTest&&!is7BoomMode){
        var sizeBar = document.querySelector('.popup-size')
        if(!sizeDisplayed){
            sizeBar.style.display = 'block'
            sizeDisplayed = !sizeDisplayed
        }else{
            sizeBar.style.display = 'none'
            sizeDisplayed = !sizeDisplayed
        }
    }
}

function test(elButton){
    inCreatorMode = false
    isCreatorTest = true
    restart()
    gNumOfMines = createdMines

    var elMineDisplay = document.querySelector('.minecount')
    elMineDisplay.innerText = '💣*'+createdMines

    createdMines = 0
    elButton.style.display = 'none'

    var discardBtn = document.querySelector('.discard')
    discardBtn.style.display = 'block'
}

function discard(elButton){
    sizeDisplayed = !sizeDisplayed
    isCreatorTest = false
    setDifficulty(25,3)
    elButton.style.display = 'none'
}
