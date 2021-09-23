import State from "../State.js";
import Witch from "../../entities/Witch.js";

export default class TouhouState extends State {    

    // More shall be added.

    constructor(){
        super();
        this.witch = new Witch(50, 50);
    };

    build(witch) {
        this.witch = witch;
    }

    update(trueTime) {
        this.witch.update(trueTime);

    }

    render() {
        this.witch.render();
    }
}