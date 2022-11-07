import { X, Y, WHITE } from "../Constants.js";

class CanvasHelper {
    static canvas;
    static width;
    static height;
    static ctx;

    static startCanvas() {
        this.canvas = document.querySelector("#canvas-game");
        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    static getWidth() {
        return this.width;
    }

    static getHeight() {
        return this.height;
    }

    static getCtx() {
        return this.ctx;
    }

    static addImage(image, coordinates, width, height) {
        this.ctx.drawImage(image, coordinates[X], coordinates[Y], width, height);
    }

    static getCanvas() {
        return this.canvas;
    }

    static getMousePosition(event) { 
        let rect = this.canvas.getBoundingClientRect(); 
        let x = event.clientX - rect.left; 
        let y = event.clientY - rect.top;
        let coordinates = [];
        coordinates[X] = x;
        coordinates[Y] = y;
        return coordinates;
    }

    static clearCanvas() {
        this.ctx.fillStyle = WHITE;
        this.ctx.fillRect(0,0, this.width, this.height);
    }

}

export default CanvasHelper;