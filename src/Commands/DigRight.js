import {GameState} from "../GameState";
import {GameMap} from "../GameMap";

export class DigRight {
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

        if (GameMap.map[row][col+1] === null) return;

        if (GameMap.map[row][col+1].isDiggable()) {
            this.counter++;
            if (this.counter === 60) {
                GameMap.map[row][col+1].isDug = true;
            }
            return;
        }

        if (GameMap.map[row][col+1].isBurrowable() && GameMap.map[row][col+1].occupant === null) {
            GameMap.map[row][col].occupant = null;
            GameMap.map[row][col+1].occupant = this.puppet;
        }
    }
}