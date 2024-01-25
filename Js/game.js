const restartBtn = document.querySelector('.restart')
const cells = document.querySelectorAll('.cell')
let currentPlayer = 'X'
let gameTable = ['', '', '', '', '', '', '', '', '']

cells.forEach(cell => {
  cell.addEventListener('click', cellClicked)
})

function cellClicked(event) {
  const clickedIndex = +(event.target.id.replace('c-', '') - 1)
  if (gameTable[clickedIndex] !== '') { return }

  changePlayer(clickedIndex)
  upDate()
  determineTheWin()
}

function changePlayer(clickedIndex) {
  if (gameTable[clickedIndex] !== '') { return }

  gameTable[clickedIndex] = currentPlayer
  currentPlayer = currentPlayer == 'X' ? '0' : 'X'
}

function upDate() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = gameTable[i]
  }
}

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function determineTheWin() {
  for (const con of winConditions) {
    let [a, b, c] = [
      gameTable[con[0]],
      gameTable[con[1]],
      gameTable[con[2]]
    ]

    if (a != '' && (b != '') && (c != '')) {
      if (a === b && b === c) {
        declareWinner(a)
        cells.forEach(cell => cell.setAttribute('disabled', true))
      }
       
      if (a !== b && b !== c) {
        if (!gameTable.includes('')) {
          console.log(!gameTable.includes(''))
          declareDraw()
        }
      }
    }
  }
}

// Winner and draw
function declareWinner(player) {
  const mass = document.querySelector('.massage')
  mass.innerText = `Declare ${player} the winner!`
}

function declareDraw() {
  const mass = document.querySelector('.massage')
  mass.innerText = `The match ended in a draw!`
}

// Restart game
restartBtn.addEventListener('click', () => {
  currentPlayer = 'X'
  gameTable = ['', '', '', '', '', '', '', '', '']

  cells.forEach(cell => { cell.innerText = '' })
  document.querySelector('.massage').innerText = ''
  cells.forEach(cell => cell.removeAttribute('disabled'))
})


