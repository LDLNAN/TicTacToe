// Initialize a 3x3 board with zeros (empty cells)
const gameBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
const testBoard1 = [[1, -1, -1], [1, -1, 1], [0, -1, 1]]
const testBoard2 = [[1, 1, -0], [-1, -1, 0], [0, -1, 1]]
const testBoard3 = [[-1, 1, -1], [1, 1, -1], [1, -1, 1]]

// Function that checks the game state
// 0 = game continues, 1 = player 1 wins, -1 = player 2 wins, 2 = draw
function checkGame(board, player) {
  // Rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
      return [player]
    }
  }
  // Columns
  for (let j = 0; j < 3; j++) {
    if (board[0][j] === player && board[1][j] === player && board[2][j] === player) {
      return [player]
    }
  }
  // Diagonals
  if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
    return [player]
  }
  if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
    return [player]
  }
// Draw (all cells filled), else return 0
return board.every(row => row.every(cell => cell !== 0)) ? 2 : 0; 
}

function ArrayToString(array) { // Conversion function: from string, and from digits - to X and O
    return array.toString().replaceAll('-1', ' O ').replaceAll('1', ' X ').replaceAll('0', '   ').replaceAll(',', '│')
}

function displayBoard(boardState) { // A single console.log to display the board, each new line (\n) is a seperate line for clarity
console.log("╭    1   2   3    ╮\n" + "   ┌───────────┐\n" + 
    "A  │" + ArrayToString(boardState[0]) + "│  │" + "\n" + 
    "   │───┼───┼───│\n" + 
    "B  │" + ArrayToString(boardState[1]) + "│  │" + "\n" + 
    "   │───┼───┼───│\n" + 
    "C  │" + ArrayToString(boardState[2]) + "│  │" + "\n" + 
    "   └───────────┘\n" +
    "╰   ──  ──  ──    ╯\n")
}

// Test board initialization and display
function boardTest() {
    displayBoard(gameBoard)
    displayBoard(testBoard1)
    displayBoard(testBoard2)
    displayBoard(testBoard3)
}
boardTest()
