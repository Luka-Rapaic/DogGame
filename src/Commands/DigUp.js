import {GameState} from "../GameState";
import {GameMap} from "../GameMap";
import {MoveLeft} from "./MoveLeft";
import {MoveRight} from "./MoveRight";
import {Jump} from "./Jump";

export class DigUp {
    constructor(puppet) {
        this.puppet = puppet;
    }

    previousFrame = 0;
    counter = 0;

    execute() {
        if (this.previousFrame + 1 !== GameState.frameID) this.counter = 0;
        this.previousFrame = GameState.frameID;

        let row = GameMap.getRow(this.puppet.y);
        let col = GameMap.getCol(this.puppet.x);

        if (GameMap.map[row-1][col] === null) {
            this.puppet.keyA = new MoveLeft(this.puppet);
            this.puppet.keyD = new MoveRight(this.puppet);
            this.puppet.keyW = new Jump(this.puppet);
            //TODO Iskoci iz zemlje
        }

        if (GameMap.map[row-1][col].isDiggable()) {
            this.counter++;
            if (this.counter === 60) {
                GameMap.map[row-1][col].isDug = true;
            }
            return;
        }

        if (GameMap.map[row-1][col].isBurrowable() && GameMap.map[row-1][col].occupant === null) {
            GameMap.map[row][col].occupant = null;
            GameMap.map[row-1][col].occupant = this.puppet;
        }
    }
}