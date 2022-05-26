"use strict"

var IDLE = '<img src="img/idle.png" alt="idle"></img>'
var DEAD = '<img src="img/dead.png" alt="idle"></img>'
var WON = '<img src="img/won.png" alt="idle"></img>'
var STEPPED_ON_MINE = '<img src="img/steppedOnMine.png" alt="idle"></img>'

function steppedOnMine(){
    var elSmile = document.querySelector('.smile')
    if(gHearts>1){
        elSmile.innerHTML = STEPPED_ON_MINE
        setTimeout(()=>{elSmile.innerHTML = IDLE}, 1500)
    }else{
        IDLE = DEAD
        elSmile.innerHTML = DEAD
    }
}

function smileWon(){
    var elSmile = document.querySelector('.smile')
    IDLE = WON
    elSmile.innerHTML = WON
}

function restart(){

    clearInterval(gPlayTime)
    gPlayTime = 0

    //refresh smile
    IDLE = '<img src="img/idle.png" alt="idle"></img>'
    var elSmile = document.querySelector('.smile')
    elSmile.innerHTML = IDLE
    

    //refresh scores
    gGame.isOn = false
    gGame.clickedOnce = false
    gGame.discroveredCells = 0
    gNumOfFlags = gNumOfMines
    gHearts = 3
    gSafeClicks = 3
    var elButton = document.querySelector('.safe-click')
    elButton.innerText = 'Safe Click * 3'

    gNumOfFlags = gNumOfMines

    undoList = []

    //refresh evetything
    var elTimer = document.querySelector('.timer')
    elTimer.innerText = 'Click on a Tile to Start!'

    init()
}

