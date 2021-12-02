/**
 * Determines if a a specific item is out of bounds of the canvas.
 * @param {{
 * canvasWidth: Number, 
 * canvasHeight:Number,
 * itemX: Number,
 * itemY: Number,
 * itemWidth: Number,
 * itemHeight: Number
 * }} paramaters 
 * @returns {Boolean} returns true if out of bounds of the canvas and false if not.
 */
export const isObb = function(paramaters) {

    if(!paramaters) {
        throw Error("isObb was given no paramaters to examine.");
    }

    if( (paramaters.itemX + paramaters.itemWidth  > paramaters.canvasWidth) ||
    (paramaters.itemX < 0) ||
    (paramaters.itemY < 0) ||
    (paramaters.itemY + paramaters.itemHeight > paramaters.canvasHeight) ) {

        return true;
    }
    else{
        return false

    }

    throw Error("isObb was not implemented.");

}
