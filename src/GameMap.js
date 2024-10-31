import {GrassBlock} from "./TerrainBlocks/SurfaceBlocks/GrassBlock";
import {BLOCK_SIZE} from "./Block";
import {GrassFlowersBlock} from "./TerrainBlocks/SurfaceBlocks/GrassFlowersBlock";
import {DirtPathBlock} from "./TerrainBlocks/SurfaceBlocks/DirtPathBlock";
import {StonePathBlock} from "./TerrainBlocks/SurfaceBlocks/StonePathBlock";
import {DirtBlock} from "./TerrainBlocks/FullBlocks/DirtBlock";
import {SandBlock} from "./TerrainBlocks/SurfaceBlocks/SandBlock";
import {SandDeepBlock} from "./TerrainBlocks/FullBlocks/SandDeepBlock";
import {CloudBlock} from "./TerrainBlocks/SurfaceBlocks/CloudBlock";

const SCENE_WIDTH = 18;
const SCENE_HEIGHT = 12;

export class GameMap {

    static map = null;

    static setMap(map) {
        this.map = map;
    }

    static getRow(y) {
        return Math.floor(y / BLOCK_SIZE);
    }

    static getCol(x) {
        return Math.floor(x / BLOCK_SIZE);
    }

    static getBlock(x, y) {
        return map[Math.floor(y / BLOCK_SIZE)][Math.floor(x / BLOCK_SIZE)];
    }

    static getScene(row, col) {
        let finalRow = row + SCENE_HEIGHT / 2;
        let finalCol = col + SCENE_WIDTH / 2;

        let scene = []
        for (let currRow = row - SCENE_HEIGHT / 2; currRow < finalRow; currRow++) {
            let sceneRow = [];

            for (let currCol = col - SCENE_WIDTH / 2; currCol < finalCol; currCol++) {
                sceneRow.push(this.map[currRow][currCol]);
            }

            scene.push(sceneRow);
        }

        return scene;
    }

    static readSchema(schema) {
        let map = [];

        for (let row = 0; row < schema.length; row++) {
            let mapRow = [];

            for (let col = 0; col < mapPlot[row].length; col++) {
                let x = col * BLOCK_SIZE;
                let y = row * BLOCK_SIZE;
                let block;

                switch(schema[row][col]) {
                    case 'grass':
                        block = new GrassBlock(x, y);
                        break;
                    case 'flowers':
                        block = new GrassFlowersBlock(x, y);
                        break;
                    case 'dirtPath':
                        block = new DirtPathBlock(x, y);
                        break;
                    case 'stonePath':
                        block = new StonePathBlock(x, y);
                        break;
                    case 'dirt':
                        block = new DirtBlock(x, y);
                        break;
                    case 'sand':
                        block = new SandBlock(x, y);
                        break;
                    case 'sandDeep':
                        block = new SandDeepBlock(x, y);
                        break;
                    // case 'waterFall':
                    //     block = new water(j * BLOCKSIZE, i * BLOCKSIZE);
                    //     break;
                    case 'cloud':
                        block = new CloudBlock(x, y);
                        break;
                    default:
                        block = null;
                }

                mapRow.push(block);
            }

            map.push(mapRow);
        }

        return map;
    }
}