import {DEBUG, context} from "../global.js";

export default class Hitbox {

    //The ways the inputs interract with the world, a hitbox has several at a time.
    static TYPE = {
       "Hit": 0,
       "Hurt": 1,
       "Dead": 2,
       "Event": 3,
       "Unknown": 4,
       };

    /**
     * A bot representing a area on which an affect is based.
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} width 
     * @param {Number} height 
     * @param {Number} xOffset
     * @param {Number} yOffset
     * @param {Number | Number[]} types 
     */
    constructor(x, y, width, height, xOffset = 0, yOffset = 0, types = [Hitbox.TYPE.Unknown]){
        this.types = types;

        this.xOffset = xOffset;
        this.yOffset = yOffset;

        this.x = x + xOffset;
        this.y = y + yOffset;

        this.width = width;
        this.height = height;

    }

    /**
     * Changes the offsets used by the hitbox and replaces them with a new set of offsets.
     * @param {Number} xOffset 
     * @param {Number} yOffset 
     */
    setNewOffsets(xOffset, yOffset){
        this.x -= this.xOffset;
        this.y -= this.yOffset;

        this.xOffset = xOffset;
        this,yOffset = yOffset;

        this.x += this.xOffset;
        this.y += this.yOffset;
    }

    /**
     * Copies a specified x and y place, meant to be used to follow the entity.
     * @param {Number} x The x place to mimic the follow.
     * @param {Number} y The y place to mimic the follow.
     */
    mimic(x, y){
        this.x = x;
        this.y = y;
    }

	render() {
        if(DEBUG && context){
            context.save();
            context.strokeStyle = "blue";
            context.lineWidth = 4;
            context.beginPath();
            context.rect(this.x, this.y, this.width, this.height);
            context.stroke();
            context.closePath();
            context.restore();
        }
	}

    /**
     * Determines the color of the hibox depending on the mix go types and then returns that color.
     */
    #getColour(){
        return "blue"
    }


}