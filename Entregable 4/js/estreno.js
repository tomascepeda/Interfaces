import { scrollAnimation } from "./scrollAnimator.js";

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#call-to-action").addEventListener("click", () => {
        document.querySelector("section.reserve").scrollIntoView({ behavior: 'smooth' });
    });
    animateCards();
    animateLeftScroll();
    let charactersTitle = document.querySelector("#characters-title");
    scrollAnimation(charactersTitle, 550, (percentage) => {
        charactersTitle.style.opacity = percentage;
        charactersTitle.style.fontSize = 16 + (percentage * 18) + "px";
        charactersTitle.style.top = -90 + (percentage * 90) + "px";
    });
});

function animateLeftScroll() {
    let h1s = document.querySelectorAll(".scroll-animated-right-column h1");
    let images = document.querySelectorAll(".scroll-animated-left-column img");
    h1s.forEach((h1, i) => {
        let isFirstImage = i == 0;
        let isLastImage = i == h1s.length -1;
        let phaseOneFinish = 0.3;
        let phaseThreeStart = 0.7;
        let isOnPhaseOne = (percentage) => percentage <= phaseOneFinish;
        let isOnPhaseThree = (percentage) => percentage >= phaseThreeStart;
        let scrollValue = window.innerHeight + (window.innerHeight/3);
        if (isFirstImage)
            scrollAnimation(h1, scrollValue, (percentage) => {
                images[i].style.opacity = 1;
                images[i].style.left = 0;
                if (isOnPhaseOne(percentage)) {
                    let percentagePhaseOne = ((percentage * 100) / phaseOneFinish) / 100;
                    images[i].style.opacity = percentagePhaseOne;
                    images[i].style.left = percentage <= phaseOneFinish ? -120 + (percentagePhaseOne * 120) + "%" : "0";
                } else if (isOnPhaseThree(percentage)) {
                    let percentagePhaseThree = (((percentage - phaseThreeStart) * 100) / phaseOneFinish) / 100;
                    images[i].style.opacity = 1 - percentagePhaseThree;
                }
            });
        else if (isLastImage)
            scrollAnimation(h1, scrollValue, (percentage) => {
                if (percentage <= phaseThreeStart) {
                    let percentage2 = ((percentage * 100) / phaseOneFinish) / 100;
                    images[i].style.opacity = percentage2;
                    images[i].style.left = 0;
                } else {
                    let percentage2 = (((percentage - phaseThreeStart) * 100) / phaseOneFinish) / 100;
                    images[i].style.opacity = 1 - percentage2;
                    images[i].style.left = (percentage2 * -120) + "%";
                }
            });
        else
            scrollAnimation(h1, scrollValue, (percentage) => {
                images[i].style.opacity = 1;
                if (isOnPhaseOne(percentage)) {
                    let percentagePhaseOne = ((percentage * 100) / phaseOneFinish) / 100;
                    images[i].style.opacity = percentagePhaseOne;
                } else if (isOnPhaseThree(percentage)) {
                    let percentagePhaseThree = (((percentage - phaseThreeStart) * 100) / phaseOneFinish) / 100;
                    images[i].style.opacity = 1 - percentagePhaseThree;
                }
            });
    });
}

function animateCards() {
    let cards = document.querySelectorAll(".section-cards-info .card");
    let maxCardsAnimation = 500;
    scrollAnimation(cards[0], maxCardsAnimation, (percentage, card) => card.style.left = -35 + (percentage * 35) + "%");
    scrollAnimation(cards[1], maxCardsAnimation, (percentage, card) => card.style.marginTop = 200 - (percentage * 200) + "px");
    scrollAnimation(cards[2], maxCardsAnimation, (percentage, card) => card.style.left = 35 - (percentage * 35) + "%");
}
