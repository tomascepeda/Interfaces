import { X,Y,PLAYER_1,PLAYER_2 } from "./Constants.js";
import CanvasHelper from "./Helper/CanvasHelper.js";
import Board from "./Board.js";

class Token {
    coordinates;
    radius;
    img;
    color;
    container;

    constructor(radius, img, color, coordinates) {
        this.coordinates = [];
        if (coordinates == undefined) {
            this.coordinates[X] = 0;
            this.coordinates[Y] = 0;
        } else {
            this.coordinates[X] = coordinates[X];
            this.coordinates[Y] = coordinates[Y];
        }
        this.radius = radius;
        this.img = new Image();
        this.img.src = img.src;
        this.color = color;
        this.container = null;
    }

    assignContainer(container) {
        this.container = container;
    }

    isInContainer() {
        return this.container != null;
    }

    getContainer() {
        return this.container;
    }

    getRadius() {
        return this.radius;
    }

    draw() {
        if (this.img.complete) {
            this.loadImage();
        } else {
            this.img.onload = this.loadImage.bind(this);
        }
    }

    calculateOffset(e) {
        let clickCoordinates = CanvasHelper.getMousePosition(e);
        let coordinates = [];
        coordinates[X] = clickCoordinates[X] - this.coordinates[X];
        coordinates[Y] = clickCoordinates[Y] - this.coordinates[Y];
        return coordinates;
    }

    isClicked(coordinates) {
        let coincideX = (coordinates[X] < this.coordinates[X] + this.radius) &
                    (coordinates[X] > this.coordinates[X] - this.radius);
        let coincideY = (coordinates[Y] < this.coordinates[Y] + this.radius) &
        (coordinates[Y] > this.coordinates[Y] - this.radius);
        return (coincideX & coincideY);
    }

    move(coordinates) {
        this.coordinates[X] = coordinates[X];
        this.coordinates[Y] = coordinates[Y];
    }

    animate(coordinates, intensity, order) {
        let xPermanent = false;
        let yPermanent = false;
        if (this.coordinates[Y] < coordinates[Y]) {
            this.coordinates[Y] = this.coordinates[Y] + intensity;
            if (this.coordinates[Y] >= coordinates[Y]) {
                this.coordinates[Y] = coordinates[Y];
            }
        } else if (this.coordinates[Y] > coordinates[Y]) {
            this.coordinates[Y] = this.coordinates[Y] - intensity;
            if (this.coordinates[Y] <= coordinates[Y]) {
                this.coordinates[Y] = coordinates[Y];
            }
        } else {
            yPermanent = true;
        }

        if (this.coordinates[X] < coordinates[X]) {
            this.coordinates[X] = this.coordinates[X] + intensity;
            if (this.coordinates[X] >= coordinates[X]) {
                this.coordinates[X] = coordinates[X];
            }
        } else if (this.coordinates[X] > coordinates[X]) {
            this.coordinates[X] = this.coordinates[X] - intensity;
            if (this.coordinates[X] <= coordinates[X]) {
                this.coordinates[X] = coordinates[X];
            }
        } else {
            xPermanent = true;
        }

        if (!(xPermanent && yPermanent)) {
            CanvasHelper.clearCanvas();
            order();
            let handler = ()=> this.animate(coordinates,intensity,order);
            setTimeout(handler.bind(this), 10);
        }
    }

    loadImage() {
        let ctx = CanvasHelper.getCtx();
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.coordinates[X], this.coordinates[Y], this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        
        ctx.drawImage(this.img, this.coordinates[X] - this.radius, this.coordinates[Y] - this.radius, this.radius*2, this.radius*2);

        ctx.beginPath();
        ctx.arc(this.coordinates[X] - this.radius, this.coordinates[Y] - this.radius, this.radius, 0, Math.PI * 2, true);
        ctx.clip();
        ctx.closePath();
        ctx.restore();
    }

    isAboveColumn(container) {
        let containerXCoordinate = container.getXCoordinate();
        let containerYCoordinate = container.getYCoordinate();
        let containerWidth = container.getWidth();
        let matchX = ((this.coordinates[X] > containerXCoordinate) &&
                    (this.coordinates[X] < containerXCoordinate + containerWidth));
        let aboveOfY = this.coordinates[Y] < containerYCoordinate;
        return !!(matchX && aboveOfY);
    }

    compare(token) {
        return !!((this.color == PLAYER_1 & token.getColor() == PLAYER_1) ||
            (this.color == PLAYER_2 & token.getColor() == PLAYER_2));
    }

    getColor() {
        return this.color;
    }

    setWinner(image) {
        this.img = new Image();
        this.img.src = image.src;

        let loadImage = ()=> {
            let ctx = CanvasHelper.getCtx();
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.coordinates[X], this.coordinates[Y], this.radius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            
            ctx.drawImage(this.img, this.coordinates[X] - this.radius, this.coordinates[Y] - this.radius, this.radius*2, this.radius*2);

            ctx.beginPath();
            ctx.arc(this.coordinates[X] - this.radius, this.coordinates[Y] - this.radius, this.radius, 0, Math.PI * 2, true);
            ctx.clip();
            ctx.closePath();
            ctx.restore();
        }

        this.img.onload = loadImage.bind(this);
    }
}

export default Token;