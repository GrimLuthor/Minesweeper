"use strict"

function renderBoard(){
    var strHTML = '<table border="1"><tbody>';
    for (var i = 0; i < gBoard.length; i++) {
      strHTML += '<tr>';
      for (var j = 0; j < gBoard[0].length; j++) {
        var className = 'cell cell-' + i + '-' + j + ' hidden';
        if(gBoard[i][j].isMine){
            className+=' mine'
        }
        strHTML += `<td class="${className}" onclick="cellClicked(this,${i},${j})"></td>`
      }
      strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(".board-container");
    elContainer.innerHTML = strHTML;
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



