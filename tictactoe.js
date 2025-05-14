const readline = require('readline')
// Initialize a 3x3 board with zeros (empty cells)
let gameBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

// Predefined scenarios
const testBoard1 = [[1, -1, -1], [1, 0, 1], [0, -1, 1], "Naughts' turn. This player can win by placing an O in cell B2.", "SCENARIO  1"]
const testBoard2 = [[1, 1, -0], [-1, -1, 0], [0, -1, 1], "Crosses' turn. This player can win by placing an X in cell A3.", "SCENARIO  2"]
const testBoard3 = [[-1, 1, -1], [1, 0, -1], [1, -1, 1], "Crosses' turn. This game will result in a draw when this player places an X in cell B2.", "SCENARIO  3"]

let player1BombCount = 0 // Number of bombs for player 1 (X)
let player2BombCount = 0 // Number of bombs for player 2 (O)
let bombMode = false // Flag to indicate if bomb mode is enabled
// Use the readline module to read terminal input, and send output I think??
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function start() {
  mainMenu()
}

// Function to display the main menu
function mainMenu() {
    bombMode = false // Reset bomb mode
    player1BombCount = 0 // Reset bomb count for player 1
    player2BombCount = 0 // Reset bomb count for player 2
    gameBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]] // Reset game board
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
              selectGameMode(0)
              break
          case "5": // Two-Player Game
              console.clear()
              selectGameMode(1)
              break
          case "6": // Exit
              console.log("Exiting...")
              rl.close() // Game wont close without this
              break
          default:
              mainMenu()
      }
  })
}

// Function to select game mode (normal or bomb-enhanced)
function selectGameMode(gameType) {
    console.clear()
    console.log("   ┌─────────────┐\n   │ TIC TAC TOE │\n   └─────────────┘\n   SELECT GAME-TYPE\n──────────────────────")
    console.log("1. Normal")
    console.log("2. Bomb-Enhanced")
    console.log("──────────────────────")
      rl.question("Bomb-Enhanced? (1-2): ", (input) => {
        if (input === "1") {
            // Normal game
            if (gameType === 0) {
                randomPlayTurn(1, false)
            } else {
                playTurn(1, false)
            }
        } else if (input === "2") {
            // Bomb-enhanced game
            selectBombCount(gameType)
        } else {
            selectGameMode(gameType)
        }
    })
}

// Function to select number of bombs for bomb-enhanced mode
function selectBombCount(gameType) {
    console.clear()
    console.log("   ┌─────────────┐\n   │ TIC TAC TOE │\n   └─────────────┘\n    BOMB-ENHANCED\n──────────────────────")
    console.log("How many bombs per player? (1-3)")
    console.log("──────────────────────")
      rl.question("Enter bomb count (1-3): ", (input) => {        const bombCount = parseInt(input)
        if (bombCount >= 1 && bombCount <= 3) {
            // Set bomb counts for both players
            player1BombCount = bombCount
            player2BombCount = bombCount
            
            if (gameType === 0) {
                randomPlayTurn(1, true)
            } else {
                playTurn(1, true)
            }
        } else {
            selectBombCount(gameType)
        }
    })
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
  return board.every(row => row.every(cell => cell !== 0)) ? 2 : 0
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
    })
}

// Function to normalize and convert input to consistent format
function convertInput(input) {
  // Normalize input: remove spaces, convert to uppercase
  const normalized = input.trim().toUpperCase()
  
  // Check if input follows the expected pattern (A1, B2, etc.)
  // Check if the input has exactly 2 characters
  if (normalized.length !== 2) {
    return null
  }
  // Check if the first character is a letter (A, B, C)
  if (!['A', 'B', 'C'].includes(normalized[0])) {
    return null
  }

  if (!['1', '2', '3'].includes(normalized[1])) {
    return null
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
  })
}

// Function to handle a random turn
function randomPlayTurn(player, bombMode = false) {
  console.clear()
  console.log("   ┌─────────────┐\n   │ TIC TAC TOE │\n   └─────────────┘") 
  if (bombMode === true) {
    console.log(" RANDOM GAME  (BOMBS)")
  } else {
    console.log("     RANDOM GAME")
  }
  console.log("──────────────────────")

  // Display the current state of the board
  displayBoard(gameBoard)
  console.log ("──────────────────────")

  // Show whose turn it is and their bomb count
  const playerSymbol = player === 1 ? "X" : "O" // If player is 1, "X", else "O"
  const currentBombCount = player === 1 ? player1BombCount : player2BombCount

  // Find all empty cells, add to an array as their indexes
  const emptyCells = []
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (gameBoard[i][j] === 0) {
        emptyCells.push([i, j])
      }
    }
  }
  
  // No empty cells means the game is a draw
  if (emptyCells.length === 0) {
    gameOver(2)
    return
  }
  
  // Pick a random empty cell
  const randomIndex = Math.floor(Math.random() * emptyCells.length)
  const [row, col] = emptyCells[randomIndex]
  
  // Convert the move to the expected format (A1, B2, etc.)
  const rowLabel = String.fromCharCode(65 + row) // A-C = 65-67, so we add 65 to the row index to get the correct row letter
  const colLabel = col + 1 // 1-3 = 1-3, so we add 1 to the column index to get the correct column number
  
  // Decide randomly whether to use a bomb (if available)
  let useBomb = false
  if (bombMode === true && currentBombCount > 0) {
    // 30% chance to use a bomb
    useBomb = Math.random() < 0.3
  }
  
  if (useBomb) {
    console.log(playerSymbol + " will use a BOMB at: " + rowLabel + colLabel + ". Bombs remaining: " + currentBombCount)
    console.log("──────────────────────")
    
    rl.question("Press Enter to continue...", () => {
      // Place the player's mark
      gameBoard[row][col] = player
      
      // Clear the row (except where the bomb was placed)
      for (let j = 0; j < 3; j++) {
        if (j !== col) {
          gameBoard[row][j] = 0
        }
      }
      
      // Clear the column (except where the bomb was placed)
      for (let i = 0; i < 3; i++) {
        if (i !== row) {
          gameBoard[i][col] = 0
        }
      }
      
      // Decrement bomb count
      if (player === 1) {
        player1BombCount--
      } else {
        player2BombCount--
      }
      
      // Check if the game is over
      const result = checkGame(gameBoard, player)
      if (result !== 0) {
        gameOver(result)
        return
      }
        // Continue with the other player
      randomPlayTurn(-player, bombMode)
    })
  } else {
    if (bombMode === true) {
      console.log(playerSymbol + " will play: " + rowLabel + colLabel + ". Bombs remaining: " + currentBombCount)
    } else {
      console.log("   " + playerSymbol + " will play: " + rowLabel + colLabel)
    }
    console.log("──────────────────────")
    
    rl.question("Press Enter to continue...", () => {
      // Make the move
      gameBoard[row][col] = player
      
      // Check if the game is over, and if it is, run the gameOver function
      const result = checkGame(gameBoard, player)
      if (result !== 0) {
        gameOver(result)
        return
      }
        // Continue with the other player
      randomPlayTurn(-player, bombMode)
    })
  }
}

// Function to handle a player's turn
function playTurn(player, bombMode = false) {
  
  console.clear()
  console.log("   ┌─────────────┐\n   │ TIC TAC TOE │\n   └─────────────┘") 
  if (bombMode === true) {
    console.log("2-PLAYER GAME  (BOMBS)")
  } else {
    console.log("    2-PLAYER GAME")
  }
  console.log("──────────────────────")
  
  // Display the current state of the board
  displayBoard(gameBoard)
  console.log ("──────────────────────")

  // Show whose turn it is
  const playerSymbol = player === 1 ? "X" : "O" // If player is 1, "X", else "O"
  const currentBombCount = player === 1 ? player1BombCount : player2BombCount
  if (bombMode === true) {
    console.log(" " + playerSymbol + "'s  turn (Bombs: " + currentBombCount + ")")
  } else {
    console.log("      " + playerSymbol + "'s  turn")
  }
  console.log ("──────────────────────")
  
  // Create the prompt message
  const promptMessage = bombMode === true ? 
    'Enter your move (e.g., A1, B2, C3) add "!" to place a bomb (e.g. A1!, B2!): ' : 
    'Enter your move (e.g., A1, B2, C3): '
    
  rl.question(promptMessage, (input) => {
    // Variable for storing processed move
    let move
    // Check if this is a bomb placement
    const isBombMove = bombMode === true && input.endsWith("!")
    
    // Handle input processing
    if (isBombMove) {
      // Remove the "!" from the input
      const bombInput = input.slice(0, -1)
      // Convert the input to row and column indexes
      move = convertInput(bombInput) // Returns null if invalid input
    } else {
      move = convertInput(input) // Returns null if invalid input
    }
      // Check if the move is valid
    if (!move) {
      console.log("Invalid input! Try again with the format 'A1', 'B2', etc.")
      setTimeout(() => playTurn(player, bombMode), 2000)
      return
    }
    
    // Convert the move to row and column indexes
    const [row, col] = move
      // Check if the cell is already taken
    if (gameBoard[row][col] !== 0) {
      console.log("That cell is already taken. Please try again.")
      playTurn(player, bombMode)
      return
    }
    
    // Check if the player wants to use a bomb and has bombs left
    if (isBombMove) {
      if (currentBombCount > 0) {
        console.log("Placing bomb! Clearing row and column...")
        // Place the player's mark
        gameBoard[row][col] = player
        // Clear the row (except where the bomb was placed)
        for (let j = 0; j < 3; j++) {         
          gameBoard[row][j] = 0
        }
        // Clear the column (except where the bomb was placed)
        for (let i = 0; i < 3; i++) {
            gameBoard[i][col] = 0
        }
        // Decrement bomb count
        if (player === 1) {
            player1BombCount--
        } else {
            player2BombCount--
        }
        // Check if the game is over
        const result = checkGame(gameBoard, player)
        if (result !== 0) {
          gameOver(result)
          return
        }
        // Switch to next player
        playTurn(-player, bombMode)      
      } 
      else {
        console.log("You don't have any bombs left!")
        setTimeout(() => playTurn(player, bombMode), 2000)
      }
      return
    }
    
    // Make a regular move
    gameBoard[row][col] = player
    
    // Check if the game is over
    const result = checkGame(gameBoard, player)
    if (result !== 0) {
      gameOver(result)
      return
    }
      // Switch to the other player
    playTurn(-player, bombMode)
  })
}
start()