import {canvas} from "../code.js"

export class GameState {
    static ctx = canvas.getContext('2d', {alpha: false});
    static originX = 0;
    static originY = 0;
    static frameID = 0;
}