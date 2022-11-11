import { scrollAnimation } from "./scrollAnimator.js";

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#call-to-action").addEventListener("click", () => {
        document.querySelector("section.reserve").scrollIntoView({ behavior: 'smooth' });
    });
    animateCards();
    let charactersTitle = document.querySelector("#characters-title");
    scrollAnimation(charactersTitle, 550, (percentage) => {
        charactersTitle.style.opacity = percentage;
        charactersTitle.style.fontSize = 16 + (percentage * 18) + "px";
        charactersTitle.style.top = -90 + (percentage * 90) + "px";
    });
});

function animateCards() {
    let cards = document.querySelectorAll(".section-cards-info .card");
    let maxCardsAnimation = 500;
    scrollAnimation(cards[0], maxCardsAnimation, (percentage, card) => card.style.left = -35 + (percentage * 35) + "%");
    scrollAnimation(cards[1], maxCardsAnimation, (percentage, card) => card.style.marginTop = 200 - (percentage * 200) + "px");
    scrollAnimation(cards[2], maxCardsAnimation, (percentage, card) => card.style.left = 35 - (percentage * 35) + "%");
}
