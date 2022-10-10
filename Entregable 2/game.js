document.addEventListener("DOMContentLoaded", () => {
    loadCanvas();
    commentsCounter();
    document.getElementById("add-comment").addEventListener("click", () => {
        document.getElementById("submit-comment").classList.remove("none");
    });
    document.querySelector(".community-content form").addEventListener("submit", addComment);
    document.getElementById("start-game").addEventListener("click", startGame);
    let btnCommunity = document.querySelector("#btn-community");
    btnCommunity.addEventListener("click", () => {
        let divComunity = document.querySelector("#comunity-js");
        divComunity.scrollIntoView({ behavior: 'smooth' });
    });
    let btnShare = document.querySelector("#btn-share");
    let modal = document.querySelector("#modal-js");
    btnShare.addEventListener("click", () => {
        modal.classList.add("open");
    });
    let btnCloseModal = document.querySelector("#close-modal-js");
    btnCloseModal.addEventListener("click", () => modal.classList.remove("open"));
    modal.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal-share"))
            modal.classList.remove("open")
    });
});

function addComment(e) {
    e.preventDefault();
    document.getElementById("submit-comment").classList.add("none");
    let input = document.getElementById("add-comment");
    if (input.value != "") {
        let list = document.querySelector(".community-comments ul");
        let item = document.createElement("li");
        item.innerHTML = '<div class="user-image"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg></div><div class="comment"><h6>Tomás Cepeda</h6><p>' + input.value + '</p></div>';
        list.insertBefore(item, list.children[0]);
        input.value = "";
        commentsCounter();
    }
}

function commentsCounter() {
    let counter = document.getElementById("comments-counter");
    let items = document.querySelectorAll(".community-comments ul li");
    counter.innerHTML = items.length + " Comentarios";
}

function startGame() {
    let instruccions = document.querySelector(".game-instructions");
    instruccions.classList.add("invisible");
    setTimeout(() => instruccions.classList.add("none"), 1000);

}

function loadCanvas() {
    let canvas = document.getElementById("canvas-game");
    let ctx = canvas.getContext("2d");
    let backgroundImage = new Image();
    backgroundImage.onload = () => {ctx.drawImage(backgroundImage, 0, 0, canvas.clientWidth, canvas.clientHeight)}
    backgroundImage.src = "./images/gameplay/connect-4-rules.jpg";
}