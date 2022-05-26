"use strict"
var CONSTRUCTOR = '<img src="img/constructor.png" alt="idle"></img>'
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
    if(inCreatorMode) return

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
    gHearts = 3
    gSafeClicks = 3
    var elSafeClick = document.querySelector('.safe-click')
    elSafeClick.innerText = 'Safe Click * 3'
    gHintMode.gHintCount = 3
    var elHint = document.querySelector('.hint')
    elHint.innerText = 'Hint * 3'



    undoList = []

    //refresh evetything
    var elTimer = document.querySelector('.timer')
    elTimer.innerText = 'Click on a Tile to Start!'

    init()
}

