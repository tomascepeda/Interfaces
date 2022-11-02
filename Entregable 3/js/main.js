import Container from "./Container.js";
import Token from "./Token.js";
import CanvasHelper from "./Helper/CanvasHelper.js";
import Board from "./Board.js";

document.addEventListener("DOMContentLoaded", () => {
    startBoard();
    function startBoard() {
        let modality = 4;
        CanvasHelper.startCanvas();
        let board = Board.getInstance();
        board.create(modality);
        board.startBoard();
    }
});