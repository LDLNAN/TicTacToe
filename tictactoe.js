const readline = require('readline');
// Initialize a 3x3 board with zeros (empty cells)
let gameBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

// Predefined scenarios
const testBoard1 = [[1, -1, -1], [1, 0, 1], [0, -1, 1], "Naughts' turn. This player can win by placing an O in cell B2.", "SCENARIO  1"]
const testBoard2 = [[1, 1, -0], [-1, -1, 0], [0, -1, 1], "Crosses' turn. This player can win by placing an X in cell A3.", "SCENARIO  2"]
const testBoard3 = [[-1, 1, -1], [1, 0, -1], [1, -1, 1], "Crosses' turn. This game will result in a draw when this player places an X in cell B2.", "SCENARIO  3"]

// Use the readline module to read terminal input, and send output I think??
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function start() {
  mainMenu()
}

// Function to display the main menu
function mainMenu() {
    gameBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    console.clear()
    //Decoration
    console.log ("   ┌─────────────┐\n   │ TIC TAC TOE │\n   └─────────────┘\n      MAIN MENU\n──────────────────────\n1. Scenario 1\n2. Scenario 2\n3. Scenario 3\n4. Random Game\n5. 2-Player Game\n6. Exit")
    // Prompt for user input
    rl.question('──────────────────────\nEnter your choice (1-6): ', (input) => {
      // Take appropriate action based on user input
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
              playTurn(1)
              break
          case "6": // Exit
              console.log("Exiting...")
              rl.close() // Game wont close without this
              break
          default:
              mainMenu()
      }
  });
}

// Function to play a random game
function randomGame() {
  return //TODO
}

// Function that checks the game state
// 0 = game continues, 1 = player 1 wins, -1 = player 2 wins, 2 = draw
function checkGame(board, player) {
  // Rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] + board[i][1] + board[i][2] === player * 3) { // Check if the sum of the row is equal to player * 3 (-3 for O, 3 for X)
      return player
    }
  }
  // Columns
  for (let j = 0; j < 3; j++) {
    if (board[0][j] + board[1][j] + board[2][j] === player * 3) { // Check if the sum of the column is equal to player * 3 (-3 for O, 3 for X)
      return player
    }
  }
  // Diagonals
  if (board[0][0] + board[1][1] + board[2][2] === player * 3) { // Check if the sum of the diagonal is equal to player * 3 (-3 for O, 3 for X)
    return player
  }
  if (board[0][2] + board[1][1] + board[2][0] === player * 3) { // Check if the sum of the diagonal is equal to player * 3 (-3 for O, 3 for X)
    return player
  }
  // Draw (all cells filled, 2), else return 0
  if (board.every(row => row.every(cell => cell !== 0))) { // Check if all cells are filled
    return 2 // Draw
  }
  else {
    return 0 // Game continues
  }
}

// Conversion function: from string, and from digits - to X and O
function ArrayToString(array) {
    return array.toString().replaceAll('-1', ' O ').replaceAll('1', ' X ').replaceAll('0', '   ').replaceAll(',', '│')
}

function displayBoard(boardState) { // A single console.log to display the board
console.log(" ╭    1   2   3    ╮\n" + 
    "    ┌───────────┐\n" + 
    " A  │" + ArrayToString(boardState[0]) + "│  A\n" + 
    "    │───┼───┼───│\n" + 
    " B  │" + ArrayToString(boardState[1]) + "│  B\n" + 
    "    │───┼───┼───│\n" + 
    " C  │" + ArrayToString(boardState[2]) + "│  C\n" + 
    "    └───────────┘\n" +
    " ╰    1   2   3    ╯")
}

function testScenario(testBoard) {
    console.log ("   ┌─────────────┐\n   │ TIC TAC TOE │\n   └─────────────┘\n     " + testBoard[4] + "\n──────────────────────") 
    displayBoard(testBoard)
    console.log ("──────────────────────")
    console.log(testBoard[3]) // Display the scenario explaination
    console.log ("──────────────────────")
    rl.question("Press Enter to go back to menu...", () => {
        mainMenu() // Any input sent through the terminal will send back to the main menu
    });
}

// Function to normalize and convert input to consistent format
function convertInput(input) {
  // Normalize input: remove spaces, convert to uppercase
  const normalized = input.trim().toUpperCase()
  
  // Check if input follows the expected pattern (A1, B2, etc.)
  // Check if the input has exactly 2 characters
  if (normalized.length !== 2) {
    return null;
  }
  // Check if the first character is a letter (A, B, C)
  if (!['A', 'B', 'C'].includes(normalized[0])) {
    return null;
  }

  if (!['1', '2', '3'].includes(normalized[1])) {
    return null;
  }

  return [normalized.charCodeAt(0) - 65, normalized[1] - 1]
}

function gameOver(state) {
  console.clear()
  console.log("   ┌─────────────┐\n   │ TIC TAC TOE │\n   └─────────────┘\n      GAME-OVER\n──────────────────────")
  displayBoard(gameBoard)
  console.log ("──────────────────────")
  switch (state) {
    case 1:
      console.log("       X wins!")
      break
    case -1:
      console.log("       O wins!")
      break
    case 2:
      console.log("     It's a draw!")
      break
  }
  console.log ("──────────────────────")
  rl.question("Press Enter to go back to menu...", () => {
    mainMenu()
  });
}

// Function to handle a player's turn
function playTurn(player) {
  console.clear()
  console.log("   ┌─────────────┐\n   │ TIC TAC TOE │\n   └─────────────┘\n    2-PLAYER GAME\n──────────────────────")
  
  // Display the current state of the board
  displayBoard(gameBoard)
  console.log ("──────────────────────")
  // Show whose turn it is
  const playerSymbol = player === 1 ? "X" : "O" // If player is 1, "X", else "O"
  console.log("      " + playerSymbol + "'s  turn")
  console.log ("──────────────────────")
  
  // Prompt user for their move
  rl.question("Enter your move (e.g., A1, B2, C3): ", (input) => {
    const move = convertInput(input) // Returns null if invalid input
    
    // Check if the move is valid
    if (!move) {
      console.log("Invalid input! Try again with format 'A1', 'B2', etc.")
      setTimeout(() => playTurn(player), 2000) // Wait 2 seconds before continuing
      return
    }
    
    const [row, col] = move
    
    // Check if the cell is already taken
    if (gameBoard[row][col] !== 0) {
      console.log("That cell is already taken. Please try again.")
      setTimeout(() => playTurn(player), 2000) // Wait 2 seconds before continuing
      return
    }
    
    // Make the move, returns before this will result in this not running when an invalid move is made
    gameBoard[row][col] = player
    // Check if the game is over, and if it is, run the gameOver function
    if (checkGame(gameBoard, player) !== 0) {
      gameOver(checkGame(gameBoard, player))
      return
    }
    // Switch to the other player
    playTurn(-player)
  })
}
start()