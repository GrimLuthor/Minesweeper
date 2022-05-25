"use strict"
const HEART = '<img src="img/heart2.png" />'
var gHearts = 3

var gPlayTime = 0

function displayHearts(){
    var heartStr = ''
    for(var i = 0; i < gHearts; i++){
        heartStr +=HEART
    }
    var heartBar = document.querySelector('.hearts')
    heartBar.innerHTML = heartStr
}

function startTime(){
    var start = Date.now()

    var elTimer = document.querySelector('.timer')
    gPlayTime = setInterval(()=>{
        var time = Date.now()-start
        elTimer.innerText = time/1000+'s'

    },1)
}