let scrollAnimation = (element, scrollValue, onAnimate) => {
    document.addEventListener("scroll", () => {
        let elementPosition = element.getBoundingClientRect().top - window.innerHeight;
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