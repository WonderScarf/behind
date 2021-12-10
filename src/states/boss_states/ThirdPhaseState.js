import SecondPhaseState from "./SecondPhaseState.js";
import Witch from "../../entities/Witch.js";
import Boss from "../../entities/Boss.js";
import { BulletType, Direction } from "../../enums.js";
import FirstPhaseState from "./FirstPhaseState.js";

/**
 * The logic for the third phase of the fight
 */
export default class ThirdPhaseState extends FirstPhaseState {   

    // Proporties of the shots fired directly from the Boss...
    static MAX_COOLDOWN = 65;

    constructor() {
        super();
    };

    /**
     * Enters the ThirdPhaseState.
     * @param {{boss: Boss, witch: Witch}} paramaters The inputs used when entering the state.
     */
    enter(paramaters) {
        console.log("Entering ThirdPhase...")

        super.enter(paramaters);
    }

    update(trueTime) {
        super.update(trueTime);


        if(this.boss.hp <= 0){
            this.boss.stateManager.loadState("DyingState", {boss: this.boss});
        }

        if(this.cooldownAoe < ThirdPhaseState.MAX_COOLDOWN){
            this.cooldownAoe++;
        }
        else {
            this.boss.shoot(BulletType.Aoe, Direction.None, this.witch.hitbox.x + (this.witch.hitbox.width / 2), this.witch.hitbox.y + (this.witch.hitbox.height / 2) ); // We shoot a aoe type bullet.
            this.cooldownAoe = 0; // We reset the current cooldown / initialize if cooldown is null.

        }

    }

    render() {
        super.render();
    }
}