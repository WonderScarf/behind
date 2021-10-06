import {context} from "../global.js";
import Entity from "./Entity.js";

export default class Soul extends Entity{

    constructor(x, y, width, height){ 
        // We will want to determine width and height by image size later on... but for now we will hardcode the value
        super(x, y , width, height);
    }

    update(trueTime) {
        //
    }

    render() {
        if(!context){
            throw new Error("Could not render bullet due to the lack of context.")
        }

        context.fillStyle = 'blue';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}