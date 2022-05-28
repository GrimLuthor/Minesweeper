"use strict"

var gHighScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(gHighScores)

function updateLeaderBoard(){
    var newHighscore = {
        name: getName(),
        time: gTime,
        size: SIZE
    }

    gHighScores.push(newHighscore)

    gHighScores.sort((a,b)=> a.time - b.time)
    gHighScores.splice(5)

    console.log(gHighScores)

    var elLeaderBoard = document.querySelector('.leaderboard')

    var leaderboardTxt = ''
    for(var i = 0; i < gHighScores.length; i++){
        leaderboardTxt+=`<${gHighScores[i].name}>${gHighScores[i].time}s, size: ${gHighScores[i].size}`+'\n'
    }
    elLeaderBoard.innerText = leaderboardTxt
    
}

function getName(){
    var elUsernameField = document.querySelector('.username')
    if (elUsernameField.value === ''){
        return 'Guest'
    }
    return elUsernameField.value
}