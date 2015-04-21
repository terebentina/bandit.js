let PIXI = require('pixi.js');

class Stage extends PIXI.Stage {
	constructor(color = 0x000000) {
		super(color);
	}
}

export default Stage;
