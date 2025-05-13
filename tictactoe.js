const readline = require('readline');
// Initialize a 3x3 board with zeros (empty cells)
let gameBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0], ""]

//Scenarios
const testBoard1 = [[1, -1, -1], [1, 0, 1], [0, -1, 1], "Naughts' turn. This player can win by placing an O in cell B2."]
const testBoard2 = [[1, 1, -0], [-1, -1, 0], [0, -1, 1], "Crosses' turn. This player can win by placing an X in cell A3."]
const testBoard3 = [[-1, 1, -1], [1, 0, -1], [1, -1, 1], "Crosses' turn. This game will result in a draw when this player places an X in cell B2."]

// Use the readline module to read input, and send output I think??
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Display the main menu
function mainMenu() {
    console.clear()
    console.log ("   ┌─────────────┐\n   │ TIC TAC TOE │\n   └─────────────┘\n      MAIN MENU\n──────────────────────\n1. Scenario 1\n2. Scenario 2\n3. Scenario 3\n4. Random Game\n5. 2-Player Game\n6. Exit")
    rl.question('──────────────────────\nEnter your choice (1-6): ', (input) => {
      switch (input) {
          case "1": // Scenario 1
              console.clear()
              testScenario(testBoard1)
              break
          case "2": // Scenario 2
              console.clear()
              testScenario(testBoard2)
              break
          case "3": // Scenario 3
              console.clear()
              testScenario(testBoard3)
              break
          case "4": // Random Game
              console.clear()
              randomGame()
              break
          case "5": // Two-Player Game
              console.clear()
              twoPlayerGame()
              break
          case "6": // Exit
              console.log("Exiting...")
              rl.close()
              break
          default:
              console.clear()
              console.log("Invalid option. Please try again.")
              mainMenu()
      }
  });
}

// Function to play a random game
function randomGame() {
  return
}

// Function to play a game
function twoPlayerGame() {
  return
}

// Function that checks the game state
// 0 = game continues, 1 = player 1 wins, -1 = player 2 wins, 2 = draw
function checkGame(board, player) {
  // Rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] + board[i][1] + board[i][2] === player * 3) {
      return [player]
    }
  }
  // Columns
  for (let j = 0; j < 3; j++) {
    if (board[0][j] + board[1][j] + board[2][j] === player * 3) {
      return [player]
    }
  }
  // Diagonals
  if (board[0][0] + board[1][1] + board[2][2] === player * 3) {
    return [player]
  }
  if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
    return [player]
  }
// Draw (all cells filled, 2), else return 0
return board.every(row => row.every(cell => cell !== 0)) ? 2 : 0
}

// Conversion function: from string, and from digits - to X and O
function ArrayToString(array) {
    return array.toString().replaceAll('-1', ' O ').replaceAll('1', ' X ').replaceAll('0', '   ').replaceAll(',', '│')
}

function displayBoard(boardState) { // A single console.log to display the board, each new line (\n) is a seperate line for clarity
console.log(" ╭    1   2   3    ╮\n" + 
    "    ┌───────────┐\n" + 
    " A  │" + ArrayToString(boardState[0]) + "│  │" + "\n" + 
    "    │───┼───┼───│\n" + 
    " B  │" + ArrayToString(boardState[1]) + "│  │" + "\n" + 
    "    │───┼───┼───│\n" + 
    " C  │" + ArrayToString(boardState[2]) + "│  │" + "\n" + 
    "    └───────────┘\n" +
    " ╰   ──  ──  ──    ╯")
}

function testScenario(testBoard) {
    console.log ("   ┌─────────────┐\n   │ TIC TAC TOE │\n   └─────────────┘\n     SCENARIO  " + testBoard.toString().match(/\d/)[0] + "\n──────────────────────") 
    gameBoard = testBoard // Turn the main board into the test board provided
    displayBoard(gameBoard)
    console.log(testBoard[3])
    console.log ("──────────────────────")
    console.log("Press Enter to go back to menu...")
    rl.question("", () => {
        mainMenu() // Run the next function after Enter is pressed
    });
}

mainMenu()