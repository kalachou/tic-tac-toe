class TicTacToe {
    constructor() {
        this.currentPlayerSymbol = 'x';
        this.matrix = [ [null,null,null],
                        [null,null,null],
                        [null,null,null]
                      ]; //???why not possible new Array(3).fill(new Array(3).fill(null));
    }

    getCurrentPlayerSymbol() {
        return this.currentPlayerSymbol;
    }

    nextTurn(rowIndex, columnIndex) {
        if (this.matrix[rowIndex][columnIndex]) {
            //do nothing
        } else {
            this.matrix[rowIndex][columnIndex] = this.currentPlayerSymbol;
            this.getCurrentPlayerSymbol() === 'x'
                ? this.currentPlayerSymbol = 'o'
                : this.currentPlayerSymbol = 'x'
        }
    }

    isFinished() {
        let winner = false;
        if (this.getWinner()||this.isDraw()) {
           winner = true;
        }
        return winner;
    }

    getWinner() {
        let winner = null;
        const matrix = this.matrix;
        function checkDiagonal() {
            let toRight = true;
            let toLeft = true;
            for (let i = 0; i < 3; i++) {
                if ((matrix[i][i] !== matrix[0][0]) 
                    || matrix[i][i] === null) {
                    toRight = false;
                }
            }
            for (let i = 0, j = 2; j >= 0 && i < 3; i++, j--) {
                if ((matrix[i][j] !== matrix[0][2]) 
                    || matrix[i][j] === null) {
                    toLeft = false;
                }
            }
            return toLeft||toRight ? matrix[1][1] : null            
        }

        function checkLines(){
            let result = null;
            let result1 = '';
            let result2 = '';
            for (let col = 0; col < 3; col++) {
                for (let row = 0; row < 3; row++) {
                    result1 += matrix[row][col] || 'n';
                    result2 += matrix[col][row] || 'n';
                }
            } 
            result1 = result1.match(/.{3}/g);
            result2 = result2.match(/.{3}/g);
            if (result1.includes('xxx')||result2.includes('xxx')) {
                result = 'x';
            }
            if (result1.includes('ooo')||result2.includes('ooo')) {
                result = 'o';
            }
            return result;          
        }

        winner = checkDiagonal() || checkLines();

        return winner;
    }

    noMoreTurns() {
        let noMoreTurns = true;
        this.matrix.forEach(x => x.includes(null) 
                                    ? noMoreTurns = false 
                                    : noMoreTurns );
        return noMoreTurns;
    }

    isDraw() {
        let isDraw = false;
        if (!this.getWinner() && this.noMoreTurns()) {
            isDraw = true;
        }
        return isDraw;
    }

    getFieldValue(rowIndex, colIndex) {
        return this.matrix[rowIndex][colIndex];
    }
}

module.exports = TicTacToe;
