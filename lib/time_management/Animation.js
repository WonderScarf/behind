import Sprite from "../sprite_management/Sprite.js";
import Timer from "./Timer.js"

export default class Animation{
	/**
	 * Uses the Timer class to flip to a new "frame" after a
	 * set interval of time has elapsed. This "frame" can be
	 * used to render different sprites in a sprite sheet.
     * @author Vikram Singh https://github.com/VikramSinghMTL with alterations made by Tyler Messina-Katunar
	 *
	 * @param {Sprite[]} frames Array of numbers corresponding to locations in a sprite sheet.
	 * @param {number} interval Switch to the next frame after this amount of time.
	 */
     constructor(frames, interval, cycles = 0) {
		this.frames = frames;
		this.interval = interval;
		this.cycles = cycles;
		this.timer = new Timer();
		this.currentFrame = 0;
		this.timesPlayed = 0;

		this.startTimer();
	}

	update(dt) {
		// No need to update if animation is only one frame.
		if (this.frames.length === 1) {
			return;
		}

		this.timer.update(dt);
	}

	/**
	 * After each interval of time, increment the current frame number.
	 * If at the end of the array of frames, loop back to the beginning.
	 */
	startTimer() {
		this.timer.addTask(() => {
			if (this.cycles === 0 || this.timesPlayed < this.cycles) {
				this.currentFrame++;
				this.currentFrame %= this.frames.length;

				if (this.currentFrame === this.frames.length - 1) {
					this.timesPlayed++;
				}
			}
		}, this.interval);
	}

	getCurrentFrame() {
		return this.frames[this.currentFrame];
	}

	/**
	 * Gets the current frame's x and y values
	 * @returns {{width: Number, height: Number}} The width and height of the current frame.
	 */
	getFrameSize(){
		return {width: this.frames[this.currentFrame].width, height: this.frames[this.currentFrame].height};
	}

	renderCurrentFrame(x, y){
		this.frames[this.currentFrame].render(x,y);
	}

	refresh() {
		this.currentFrame = 0;
		this.timesPlayed = 0;
	}

	isDone() {
		return this.timesPlayed === this.cycles;
	}

	isHalfwayDone() {
		return this.currentFrame >= this.frames.length / 2;
	}


}
