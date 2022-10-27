import { X, Y } from "./Constants.js";
import CanvasHelper from "./Helper/CanvasHelper.js";
import Board from "./Board.js";

class Container {
    coordinates;
    width;
    height;
    token;
    row;
    column;
    static image;
    imgWinner;

    constructor(coordinates, width, height){
        this.coordinates = [];
        this.coordinates[X] = coordinates[X];
        this.coordinates[Y] = coordinates[Y];
        this.width = width;
        this.height = height;
        Container.image = new Image();
        let img = document.querySelector("#container-js");
        Container.image.src = img.src;
        this.token = null;
        this.imgWinner = null;
    }

    draw() {
        if (Container.image.complete) {
            this.loadImage();
        } else {
            Container.image.onload = this.loadImage.bind(this);
        }
    }

    loadImage() {
        if (this.imgWinner == null)
            CanvasHelper.addImage(Container.image,this.coordinates,this.width,this.height);
        else
            CanvasHelper.addImage(this.imgWinner,this.coordinates,this.width,this.height);
    }

    getXCoordinate(){
        return this.coordinates[X];
    }

    getYCoordinate(){
        return this.coordinates[Y];
    }

    getWidth() {
        return this.width;
    }

    containsToken() {
        return this.token != null;
    }

    setToken(token) {
        this.token = token;
        let coordinates = [];
        coordinates[X] = this.coordinates[X] + (this.width / 2) +1;
        coordinates[Y] = this.coordinates[Y] + (this.height / 2) +1;
        let animationIntensity = 30;
        let order = ()=> {
            let board = Board.getInstance();
            board.showBackground();
            board.showTokens();
            board.showBoard();
            board.showPlayersText();
            board.showRemainingTime();
        }
        token.animate(coordinates, animationIntensity, order);
    }

    getToken() {
        return this.token;
    }

    compare(container) {
        if (container.containsToken() && this.containsToken()) {
            let containerToken = container.getToken();
            return this.token.compare(containerToken);
        } else {
            return false;
        }
    }

    setWinner(image) {
        this.imgWinner = new Image();
        this.imgWinner.src = image.src;
        let loadImg = ()=> {
            CanvasHelper.addImage(this.imgWinner,this.coordinates,this.width,this.height);
        };
        this.imgWinner.onload = loadImg.bind(this);
    }

    setRow(row) {
        this.row = row;
    }

    setColumn(column) {
        this.column = column;
    }

    getRow() {
        return this.row;
    }

    getColumn() {
        return this.column;
    }

}

export default Container;