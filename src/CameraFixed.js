import {ctx} from '../code.js'
import {GameState} from './GameState.js'

export class CameraFixed {
    constructor(trackedObject) {
        this.trackedObject = trackedObject;
    }

    update() {
        ctx.translate(GameState.originX - (this.trackedObject.x - 600), GameState.originY - (this.trackedObject.y - 400));
        GameState.originX = this.trackedObject.x - 600;
        GameState.originY = this.trackedObject.y - 400;
    }
}