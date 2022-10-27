import Container from "./Container.js";
import { X, Y, PLAYER_1, PLAYER_2, TOKEN_RADIUS, CONTAINERS_WIDTH, CONTAINERS_HEIGHT } from "./Constants.js";
import CanvasHelper from "./Helper/CanvasHelper.js";
import Token from "./Token.js";

class Board {
    rows;
    columns;
    containers;
    tokens;
    mouseDown;
    mouseMove;
    mouseUp;
    tokenSelected;
    offsetToken;
    height;
    width;
    turn;
    startBoardX;
    endBoardX;
    winner;
    gameOver;
    imgBackground;
    timeForScreen;
    static instance = new Board();

    create(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.containers = [];
        this.tokens = [];
        this.mouseDown = this.selectToken.bind(this);
        this.mouseMove = this.moveToken.bind(this);
        this.mouseUp = this.deselectToken.bind(this);
        this.tokenSelected = null;
        this.offsetToken = null;
        this.turn = null;
        this.startBoardX = null;
        this.endBoardX = null;
        this.winner = null;
        this.gameOver = false;
        this.height = CONTAINERS_HEIGHT * this.rows;
        this.width = CONTAINERS_WIDTH * this.columns;
        let background = document.querySelector("#bg-game-js");
        this.imgBackground = new Image();
        this.imgBackground.src = background.src;
        this.timeForScreen = "";
    }

    startRemainingTime(currentDate, minutes){
        let endDate = new Date();
        endDate.setMinutes(endDate.getMinutes() + minutes);
        let timer = setInterval(() => {
            if(this.winner != null){
                clearInterval(timer);
            } else {
                if(currentDate >= endDate){
                    this.gameOver = true;
                    if (this.tokenSelected != null) {
                        this.restoreToken(this.tokenSelected);
                        this.tokenSelected = null;
                    }
                    clearInterval(timer);
                } else {
                    let timeToEnd = endDate - currentDate;
                    let minutes = Math.floor((timeToEnd % (1000 * 60 * 60)) / (1000 * 60));
                    let seconds = Math.floor((timeToEnd % (1000 * 60)) / 1000);
                    if(minutes > 0 && seconds < 10)
                        seconds = "0" + seconds;
                    this.timeForScreen = "";
                    if (minutes > 0)
                        this.timeForScreen = `El juego finalizara en: ${minutes}:${seconds}`;
                    else
                        this.timeForScreen = `El juego finalizara en: ${seconds}`;
                }
            }
            currentDate.setSeconds(currentDate.getSeconds() + 1);
            this.showAll();
        }, 1000);
    }

    showRemainingTime() {
        if (this.winner != null) return;
        let ctx = CanvasHelper.getCtx();
        ctx.fillStyle = "black";
        if(this.gameOver) {
            ctx.fillText("Se acabo el tiempo", CanvasHelper.getWidth() / 2 - 130, 50);
        } else {
            ctx.fillText(this.timeForScreen, CanvasHelper.getWidth() / 2 - 180, 50); 
        }
        
    }

    static getInstance() {
        return this.instance;
    }

    startBoard() {
        this.createBoard();
        this.createTokens();
        this.assignEvents();
        this.showPlayersText();
        this.startRemainingTime(new Date(), 5);
    }

    showPlayersText() {
        let ctx = CanvasHelper.getCtx();
        ctx.font = "30px Arial";
        ctx.fillStyle = "black";

        if (this.winner == null) {
            ctx.fillText("Casa Lannister", 10, 50);
            ctx.fillText("Casa Targaryen", CanvasHelper.getWidth() -220, 50);
        } else {
            if (this.winner == PLAYER_1) {
                ctx.fillText("¡¡¡Gana la casa Lannister!!!", CanvasHelper.getWidth() / 2 - 170, 50);
            } else {
                ctx.fillText("¡¡¡Gana la casa Targaryen!!!", CanvasHelper.getWidth() / 2 - 170, 50);
            }
        }
    }

    createBoard() {
        let coordinates = [];
        let container;
        let displacementX = (CanvasHelper.getWidth() - this.width) / 2;
        let displacementY = CanvasHelper.getHeight() - this.height;
        this.startBoardX = displacementX;
        this.endBoardX = this.width + displacementX;
        this.startBoardY = CanvasHelper.getHeight() - this.height;
        this.showBackground();
        
        for (let row = 0; row < this.rows; row++) {
            this.containers[row] = [];
            for (let column = 0; column < this.columns; column++) {
                coordinates[X] = (column * CONTAINERS_WIDTH) + displacementX;
                coordinates[Y] = (row * CONTAINERS_HEIGHT) + displacementY;
                container = new Container(coordinates,CONTAINERS_WIDTH,CONTAINERS_HEIGHT);
                container.setRow(row);
                container.setColumn(column);
                this.containers[row][column] = container;
                container.draw();
            }
        }
    }

    createTokens() {
        let amountTokens = this.rows * this.columns;
        let tokensPerPlayer = amountTokens / 2;
        let token;
        let radius = TOKEN_RADIUS;
        let imgToken1 = document.querySelector("#token-1-js");
        let imgToken2 = document.querySelector("#token-2-js");

        for (let i = 0; i < amountTokens; i++) {
            if (i < tokensPerPlayer) {
                token = new Token(radius, imgToken1, PLAYER_1);
            } else {
                token = new Token(radius, imgToken2, PLAYER_2);
            }
            let action = (coordinates, token) => token.move(coordinates);
            this.assignTokenPosition(token,action);
            this.tokens[i] = token;
        }
        this.showTokens();
    }

    showBackground() {
        let backgroundCoordinates = [];
        let boardBackgroundCoordinates = [];
        backgroundCoordinates[X] = 0;
        backgroundCoordinates[Y] = 0;
        boardBackgroundCoordinates[X] = this.startBoardX;
        boardBackgroundCoordinates[Y] = this.startBoardY;
        if (this.imgBackground.complete) {
            CanvasHelper.addImage(this.imgBackground, backgroundCoordinates, CanvasHelper.getWidth(), CanvasHelper.getHeight());
            CanvasHelper.drawBoardBackground(boardBackgroundCoordinates, this.width, this.height);
        } else {
            let loadImg = () => CanvasHelper.addImage(this.imgBackground, CanvasHelper.getWidth(), CanvasHelper.getHeight());
            this.imgBackground.onload = loadImg.bind(this);
        }
    }

    assignTokenPosition(token, action) {
        let coordinates;
        let startX;
        let endX;
        let startY = 400;
        let endY = CanvasHelper.getHeight() - token.getRadius();
        if (token.getColor() == PLAYER_1) {
            startX = token.getRadius();
            endX = this.startBoardX - token.getRadius();
            coordinates = this.getRandomPosition(startX, endX, startY, endY);
        } else {
            startX = this.endBoardX + token.getRadius();
            endX = CanvasHelper.getWidth() - token.getRadius();
            coordinates = this.getRandomPosition(startX, endX, startY, endY);
        }
        action(coordinates, token);
    }

    getRandomPosition(x1, x2, y1, y2) {
        let coordinates = [];
        let distanceX = x2 - x1;
        let distanceY = y2 - y1;
        let randomX = x1 + Math.round(Math.random() * distanceX);
        let randomY = y1 + Math.round(Math.random() * distanceY);
        coordinates[X] = randomX;
        coordinates[Y] = randomY;
        return coordinates;
    }

    assignEvents() {
        let canvas = CanvasHelper.getCanvas();
        canvas.addEventListener("mousedown", this.mouseDown);
        canvas.addEventListener("mouseup", this.mouseUp);
    }

    selectToken(e) {
        let token = this.findToken(e);
        if (token != null) {
            if (this.turn == null) {
                this.turn = token.getColor();
            }

            if (this.canMoveToken(token)) {
                this.tokenSelected = token;
                this.offsetToken = token.calculateOffset(e);
                let canvas = CanvasHelper.getCanvas();
                canvas.addEventListener("mousemove", this.mouseMove);
            }
        }
    }

    canMoveToken(token) {
        return ( this.turn == token.getColor() ) && ( !token.isInContainer() ) && (this.winner == null) && (!this.gameOver);
    }

    deselectToken() {
        if (this.tokenSelected != null) {
            let columnNumber = this.searchColumn(this.tokenSelected);
            if (columnNumber != -1) {
                this.insertTokenInColumn(this.tokenSelected, columnNumber);
                this.changeTurn();
                this.showAll();
                this.checkWinner(this.tokenSelected);
                this.tokenSelected = null;
            } else {
                this.restoreToken(this.tokenSelected);
            }
        }
        let canvas = CanvasHelper.getCanvas();
        canvas.removeEventListener("mousemove", this.mouseMove);
    }

    restoreToken(token) {
        let order = ()=> this.showAll();
        let action = (coordinates, token) => token.animate(coordinates, 10, order);
        this.assignTokenPosition(token, action);
        this.tokenSelected = null;
    }

    searchColumn(token) {
        let columnNumber = 0;
        let found = false;
        while (columnNumber < this.columns && !found) {
            found = token.isAboveColumn(this.containers[0][columnNumber]);
            columnNumber++;
        }
        if (found)
            return columnNumber-1;
        else
            return -1;
    }

    insertTokenInColumn(token, columnNumber) {
        let rowNumber = this.rows -1;
        let inserted = false;
        let currentContainer;
        while (rowNumber >= 0 && !inserted) {
            currentContainer = this.containers[rowNumber][columnNumber];
            if (currentContainer.containsToken()) {
                rowNumber--;
            } else {
                currentContainer.setToken(token);
                token.assignContainer(currentContainer);
                inserted = true;
            }
        }
    }

    findToken(e) {
        let coordinates = CanvasHelper.getMousePosition(e);
        let found = false;
        let i = this.tokens.length - 1;
        
        while (i >= 0 && !found) {
            found = this.tokens[i].isClicked(coordinates);
            i--;
        }
        if (found)
            return this.tokens[i+1];
        else
            return null;
    }

    moveToken(e) {
        let flags = e.buttons !== undefined ? e.buttons : e.which;
        let primaryMouseButtonDown = (flags & 1) === 1;
        if (primaryMouseButtonDown) {
            let coordinates = CanvasHelper.getMousePosition(e);
            coordinates[X] = coordinates[X] - this.offsetToken[X];
            coordinates[Y] = coordinates[Y] - this.offsetToken[Y];
            this.tokenSelected.move(coordinates);
            this.showAll();
        } else {
            if (this.tokenSelected != null)
                this.restoreToken(this.tokenSelected);
        }
    }

    showAll() {
        CanvasHelper.clearCanvas();
        this.showBackground();
        this.showBoard();
        this.showRemainingTime();
        this.showPlayersText();
        this.showTokens();
    }

    showTokens() {
        for (let i = 0; i < this.tokens.length; i++) {
            this.tokens[i].draw();
        }
    }

    showBoard() {
        for (let i = 0; i < this.containers.length; i++) {
            for (let j = 0; j < this.containers[i].length; j++) {
                this.containers[i][j].draw();
            }
        }
    }

    checkWinner(token) {
        let tokenContainer = token.getContainer();
        let row = tokenContainer.getRow();
        let column = tokenContainer.getColumn();
        let win = this.checkTokenArea(row, column)
        if (win) {
            this.winner = token.getColor();
        }
    }

    checkTokenArea(row, column) {
        let win = false;
        let i = -3;
        let j = -3;
        let rowAux;
        let columnAux;

        while ((i <= 3) && !win) {
            j = -3;
            while ((j <= 3) && !win) {
                rowAux = row + i;
                columnAux = column + j;

                if ((rowAux >= 0 & rowAux < this.rows) && (columnAux >= 0 && columnAux < this.columns)) {
                    win = this.checkToken(rowAux, columnAux);
                }
                j++;
            }
            i++;
        }
        return win;
    }

    checkToken(row, column) {
        let container1 = this.containers[row][column];
        let container2;
        let same;

        let horizontalRight = i =>       { return this.containers[row][column + i]; };
        let horizontalLeft = i =>     { return this.containers[row][column + (i *-1)]; };
        let verticalTop = i =>          { return this.containers[row + (i *-1)][column]; };
        let verticalBottom = i =>           { return this.containers[row + i][column]; };
        let diagonalTopRight = i =>   { return this.containers[row + i][column + i]; };
        let diagonalBottomLeft = i =>  { return this.containers[row + (i *-1)][column + (i *-1)]; };
        let diagonalTopLeft = i => { return this.containers[row + i][column + (i *-1)]; };
        let diagonalBottomRight = i =>    { return this.containers[row + (i *-1)][column + i]; };

        let directions = [];
        directions[0] = horizontalRight;
        directions[1] = horizontalLeft;
        directions[2] = verticalTop;
        directions[3] = verticalBottom;
        directions[4] = diagonalTopRight;
        directions[5] = diagonalBottomLeft;
        directions[6] = diagonalTopLeft;
        directions[7] = diagonalBottomRight;

        for (let direction = 0; direction < directions.length; direction++){
            let i = 1;
            same = true;
            while ((i < 4) && same) {
                try {
                    container2 = directions[direction](i);
                } catch (error) {
                    container2 = undefined;
                }
                if (container2 != undefined) {
                    same = container1.compare(container2);
                    i++;
                } else {
                    same = false;
                }
            }
            if (same) {
                this.changeBoardColors(container1, directions[direction]);
                return true;
            }
        }
        return false;
    }

    changeBoardColors(container, direction) {
        let token = container.getToken();
        let imgContainer = document.querySelector("#container-green-js");

        container.setWinner(imgContainer);
        for (let i = 1; i <= 3; i++) {
            container = direction(i);
            token = container.setWinner(imgContainer);
        }
    }

    changeTurn() {
        if (this.turn == PLAYER_1) {
            this.turn = PLAYER_2;
        } else {
            this.turn = PLAYER_1;
        }
    }
}

export default Board;