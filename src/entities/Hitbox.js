import {DEBUG, context} from "../global.js";

export default class Hitbox {

    /**
     * A bot representing a area on which an affect is based.
     * @param {Number} x The x spawn point of the hitbox.
     * @param {Number} y The y spawn poitn of the hitbox.
     * @param {Number} width The width of the hitbox.
     * @param {Number} height The height of the hitbox.
     * @param {Number} xOffset The hitbox's offset compared to it's coresponding bounding box.
     * @param {Number} yOffset The hitbox's offset compared to it's coresponding bounding box.
     * @param {Number} id The identifier determining if the hitbox is can hit (if 2 hitboxes share an id they can collide but if they don't they can't).
     */
    constructor(x, y, width, height, xOffset = 0, yOffset = 0, id = 0){
        this.id = id;

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
            context.strokeStyle = "rgba(0, 0, 100, 1)";
            context.lineWidth = 4;
            context.beginPath();
            context.rect(this.x, this.y, this.width, this.height);
            context.stroke();
            context.closePath();
            context.restore();
        }
	}

    /**
     * Checks if hitboxes hit eachother
     * @param {Hitbox} hitbox1 The first hitbox.
     * @param {Hitbox} hitbox2 The second hitbox.
     * @returns true if there is acollision and false if not.
     */
    static isCollide(hitbox1, hitbox2) {

        //We check if the hitbox shares an ID and if they do not they can't collide so return false.
        if(hitbox1.id != hitbox2.id) {
            return false;
        }

        // We check if the hitboxes hit eachother.
        if( ((hitbox1.y + hitbox1.height) > hitbox2.y) 
        && (hitbox1.y < (hitbox2.y + hitbox2.height)) 
        && ((hitbox1.x + hitbox1.width) > hitbox2.x) 
        && (hitbox1.x < (hitbox2.x + hitbox2.width))) {
            return true;
        }
        else {
            return false;
        }
    }
    

}