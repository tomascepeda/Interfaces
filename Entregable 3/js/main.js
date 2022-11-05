import CanvasHelper from "./Helper/CanvasHelper.js";
import Board from "./Board.js";

document.addEventListener("DOMContentLoaded", () => {
    let tk1 = null;
    let tk2 = null;
    let modality = 4;
    document.querySelector("#play-mode").addEventListener("change", (e) => modality = e.target.value);
    document.querySelector("#play-button").addEventListener("click", startBoard);
    document.querySelectorAll(".selectable-token").forEach(tk => {
        tk.addEventListener("click", (e) => {
            const selectedTk = e.target;
            const isToken1 = selectedTk.classList.contains("one");
            if (isToken1) {
                tk1 = selectedTk;
                let selectedTk1 = document.querySelector("#selected-token-1");
                selectedTk1.nextElementSibling.classList.remove("invisible");
                selectedTk1.classList.remove("invisible");
                selectedTk1.setAttribute("src", tk1.getAttribute("src"));
                updateTokenColors(selectedTk, "one");
            } else {
                tk2 = selectedTk;
                let selectedTk2 = document.querySelector("#selected-token-2");
                selectedTk2.previousElementSibling.classList.remove("invisible");
                selectedTk2.classList.remove("invisible");
                selectedTk2.setAttribute("src", tk2.getAttribute("src"));
                updateTokenColors(selectedTk, "two");
            }
            onSelectToken();
        });
    });

    function onSelectToken() {
        if (tk1 == null && tk2 == null)
            document.querySelector("#container-play-btn").classList.add("invisible");
        else
            document.querySelector("#container-play-btn").classList.remove("invisible");
    }

    function startBoard() {
        showCanvas();
        CanvasHelper.startCanvas();
        let board = Board.getInstance();
        board.create(parseInt(modality), tk1, tk2);
        board.startBoard();
        document.querySelector("#reset-btn-js").addEventListener("click", () => {
            board.reset();
            handleResetButton();
        });
        document.querySelector(".container-selector-tokens").classList.remove("open");
    }

    function updateTokenColors(selectedTk, type) {
        document.querySelectorAll(".selectable-token." + type).forEach(tk => {
            if (tk == selectedTk)
                tk.classList.add("selected");
            else 
                tk.classList.remove("selected");
        })
    }

    function showCanvas() {
        document.querySelector("#reset-btn-js").classList.remove("none");
        document.querySelector("#canvas-game").classList.remove("none");
    }

    function handleResetButton() {
        document.querySelector("#reset-btn-js").classList.add("none");
        document.querySelector("#canvas-game").classList.add("none");
        document.querySelector(".container-selector-tokens").classList.add("open");
    }
});