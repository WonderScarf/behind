import { context } from "../global";

export default class Hitbox {

    //The ways the inputs interract with the world, a hitbox has several at a time.
    static type = {
       "Hit": 0,
       "Hurt": 1,
       "Dead": 2,
       "Event": 3,
       "Other": 4,
       "None": 5,
   };

    /**
     * A bot representing a area on which an affect is based.
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} width 
     * @param {Number} height 
     * @param {[]} types 
     */
    constructor(x, y, width, height, types = [Hitbox.type.None]){
        this.types = types;

        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;
    }


}