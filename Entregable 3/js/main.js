import Container from "./Container.js";
import Token from "./Token.js";
import CanvasHelper from "./Helper/CanvasHelper.js";
import Board from "./Board.js";

document.addEventListener("DOMContentLoaded", () => {
    startBoard();
    function startBoard() {
        let columns = 7;
        let rows = 6;
        CanvasHelper.startCanvas();
        let board = Board.getInstance();
        board.create(rows, columns);
        board.startBoard();
    }
});