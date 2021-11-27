import {DEBUG, context} from "../global.js";

export default class Hitbox {

    /**
     * Enum representing the different types of hitboxes that affect the ways the inputs interract 
     * with the world, a hitbox has several at a time.
     * @constant
     */
    static TYPE = {
       "Hit": 0, // A hibox that acts as collision for whatever comes into contact with it.
       "Hurt": 1, // A hitbox that damages whatever comes into contact with it
       "Dead": 2, // A hitbox that removes whatever comes into contact with it.
       "Event": 3, // A hitbox meant to trigger an event.
       "Unknown": 4, // When a hitbox is not set and how it colides is unknown.
    };

    /**
     * A bot representing a area on which an affect is based.
     * @param {Number} x The x spawn point of the hitbox.
     * @param {Number} y The y spawn poitn of the hitbox.
     * @param {Number} width The width of the hitbox.
     * @param {Number} height The height of the hitbox.
     * @param {Number} xOffset The hitbox's offset compared to it's coresponding bounding box.
     * @param {Number} yOffset The hitbox's offset compared to it's coresponding bounding box.
     * @param {String | String[]} types The type or Types that the hitbox or hurtbox has (Only those within the TYPE enum are valid).
     */
    constructor(x, y, width, height, xOffset = 0, yOffset = 0, types = [Hitbox.TYPE.Unknown]){
        this.types = types;

        this.xOffset = xOffset;
        this.yOffset = yOffset;

        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;
    }

    /**
     * Changes the offsets used by the hitbox and replaces them with a new set of offsets.
     * @param {Number} xOffset The new xOffset compared to the bounding box.
     * @param {Number} yOffset The new yOffset compared to the bounding box. 
     */
    setNewOffsets(xOffset, yOffset){
        this.xOffset = xOffset;
        this.yOffset = yOffset;   
    }

    /**
     * Copies a specified x and y place, meant to be used to follow the entity.
     * @param {Number} x The x place to mimic the follow.
     * @param {Number} y The y place to mimic the follow.
     */
    mimic(x, y){
        this.x = x + this.xOffset;
        this.y = y + this.yOffset;
    }

	render() {

        // When in debug mode draw out a hitbox.
        if(DEBUG && context){
            context.save();
            context.strokeStyle = "rgba(0, 0, 100, 1)"; //TODO replace by a constant later on.
            context.lineWidth = 4;
            context.beginPath();
            context.rect(this.x, this.y, this.width, this.height);
            context.stroke();
            context.closePath();
            context.restore();
        }
	}

}