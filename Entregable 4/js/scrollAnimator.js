let scrollAnimation = (element, scrollValue, onAnimate, elementOnScreen = "end") => {
    document.addEventListener("scroll", () => {
        let elementPosition = elementOnScreen === "end" ? element.getBoundingClientRect().top - window.innerHeight : element.getBoundingClientRect().top;
        let isElementOnScreen = elementPosition < 0;
        if (!isElementOnScreen) {
            onAnimate(0, element);
            return;
        }
        elementPosition *= -1;
        elementPosition = elementPosition > scrollValue ? scrollValue : elementPosition;
        let percentage = (elementPosition / (scrollValue / 100)) / 100;
        onAnimate(percentage, element);
    });
}

export { scrollAnimation };