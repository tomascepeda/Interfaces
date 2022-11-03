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
        document.querySelector("#reset-btn-js").addEventListener("click", () => board.reset());
    }
});