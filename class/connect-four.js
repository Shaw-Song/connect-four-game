const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ']]

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('up', 'move cursor up', this.cursor.up);
    Screen.addCommand('down', 'move cursor down', this.cursor.down);
    Screen.addCommand('left', 'move cursor left', this.cursor.left);
    Screen.addCommand('right', 'move cursor right', this.cursor.right);
    Screen.addCommand('x', 'place a X', this.placeAMoveX);
    Screen.addCommand('o', 'place a O', this.placeAMoveO);

    this.cursor.setBackgroundColor();
    this.__renderMsg("Player O plays first");
  }

  __renderMsg(msg) {
    Screen.setMessage(msg);
    Screen.render();
    Screen.setMessage("");
  }

  placeAMoveX = () => {
    if (this.playerTurn === "O") {
      this.__renderMsg("It is player O's turn")
    } else {
      const r = this.cursor.row;
      const c = this.cursor.col;
      if (this.grid[r][c] === " ") {
        this.playerTurn = "O";
        this.grid[r][c] = "X";
        Screen.setGrid(r, c, "X");
        Screen.setTextColor(r, c, "white");
        const situation = ConnectFour.checkWin(this.grid);
        if (situation) {
          ConnectFour.endGame(situation);
        } else {
          Screen.render();
        }
      } else {
        this.__renderMsg("Can not place a move on this grid!")
      }
    }

  }

  placeAMoveO = () => {
    if (this.playerTurn === "X") {
      this.__renderMsg("It is player X's turn")
    } else {
      const r = this.cursor.row;
      const c = this.cursor.col;
      if (this.grid[r][c] === " ") {
        this.playerTurn = "X";
        this.grid[r][c] = "O";
        Screen.setGrid(r, c, "O");
        Screen.setTextColor(r, c, "white");
        const situation = ConnectFour.checkWin(this.grid);
        if (situation) {
          ConnectFour.endGame(situation);
        } else {
          Screen.render();
        }
      } else {
        this.__renderMsg("Can not place a move on this grid!")
      }
    }
    
    
  }

  __isFour(i, j, grid) {
    if (grid[i][j] === grid[i][j + 1] && grid[i][j + 1] === grid[i][j + 2] && grid[i][j + 2] === grid[i][j + 3] && grid[i][j] !== " ") {
      return grid[i][j];
    } else {
      return false;
    }
  }
  
  static checkWin(grid) {

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length - 3;  j++) {
        if (grid[i][j] === grid[i][j + 1] && grid[i][j + 1] === grid[i][j + 2] && grid[i][j + 2] === grid[i][j + 3] && grid[i][j] !== " ") {
          return grid[i][j];
        }
      }
    }

    for (let j = 0; j < grid[0].length;  j++) {
      for (let i = 0; i < grid.length - 3; i++) {
        if (grid[i][j] === grid[i + 1][j] && grid[i + 1][j] === grid[i + 2][j] && grid[i + 2][j]=== grid[i + 3][j] && grid[i][j] !== " ") {
          return grid[i][j];
        }
      }
    }

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (i + 3 < grid.length 
          && j + 3 <  grid[0].length 
          && grid[i][j] === grid[i + 1][j + 1] 
          && grid[i + 1][j + 1] === grid[i + 2][j + 2] 
          && grid[i + 2][j + 2]=== grid[i + 3][j + 3] 
          && grid[i][j] !== " ") {
            return grid[i][j];
          }
        if (i - 3 >= 0
          && j + 3 <  grid[0].length 
          && grid[i][j] === grid[i - 1][j + 1] 
          && grid[i - 1][j + 1] === grid[i - 2][j + 2] 
          && grid[i - 2][j + 2]=== grid[i - 3][j + 3] 
          && grid[i][j] !== " ") {
            return grid[i][j];
          }
        
      }
      
    }

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] === " ") {
          return false;
        }
      }
    }


    return "T";


  }


  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = ConnectFour;
