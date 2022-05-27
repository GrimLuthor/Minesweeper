"use strict"


var sevenBoomBoard = []

var sevenBoomMineCount = 0

function create7Boom(size){
    sevenBoomBoard = []
    for(var i = 0; i <  Math.sqrt(size); i++){
        var row = []
        for(var j = 0; j <  Math.sqrt(size); j++){
            row.push(createCell())
        }
        sevenBoomBoard.push(row)
    }
}


function sevenBoomMines(){
    var sevenCounter = 1
    for(var i = 0; i < sevenBoomBoard.length; i++){
        for(var j = 0; j < sevenBoomBoard.length; j++){
            if(sevenCounter%7===0||sevenCounter%10===7){
                sevenBoomBoard[i][j].isMine = true
                sevenBoomMineCount++
            }
            sevenCounter++
        }
    }
}


var sbDisplayed = false
function display7Boom(elBtn){
    if(!gGame.isOn&&!isCreatorTest&&!inCreatorMode){

        if(is7BoomMode){
            is7BoomMode = false
            elBtn.innerText = '7 Boom Mode'
            sbDisplayed = !sbDisplayed
            setDifficulty(25,3)
            restart()
            
        }else{

           var sizeSbBar = document.querySelector('.popup-sb')
            if(!sbDisplayed){
                sizeSbBar.style.display = 'block'
                sbDisplayed = !sbDisplayed
            }else{
                sizeSbBar.style.display = 'none'
                sbDisplayed = !sbDisplayed
            }
        }
    }
}

function enter7BoomMode(size){

    closeAll()

    is7BoomMode = true

    SIZE = size

    create7Boom(size)
    sevenBoomMines()

    gNumOfMines = sevenBoomMineCount

    sevenBoomMineCount = 0

    init()
    

    var el7B = document.querySelector('.sevenboom')
    el7B.innerText = 'Exit 7 Boom Mode'
    
    
}