// Initialize a 3x3 board with zeros (empty cells)
const gameBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
const testBoard = [[1, -1, -1], [-1, 1, 0], [0, -1, 1]];

function ArrayToString(array) { // Conversion from string, and from digits to X and O
    return array.toString().replaceAll('-1', ' O ').replaceAll('1', ' X ').replaceAll('0', '   ').replaceAll(',', '│');
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
  displayBoard(gameBoard);
  displayBoard(testBoard);
}
boardTest();