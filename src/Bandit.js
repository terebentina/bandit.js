const BANDIT_VERSION = '0.0.1';
let game = {};

function init(width = window.innerWidth, height = window.innerHeight) {
	game.renderer = PIXI.autoDetectRenderer(width, height);
	document.body.appendChild(game.renderer.view);
	//requestAnimationFrame(animate);
	return game;
}

function animate() {
	requestAnimationFrame(animate);
	game.renderer.render(game.stage);
}

let bandit = {
	VERSION: BANDIT_VERSION,

	init: init,
	Point: require('./geom/Point'),
	//Point: PIXI.Point,
	Rectangle: PIXI.Rectangle,
	DisplayObject: require('./display/DisplayObject'),
	DisplayObjectContainer: require('./display/DisplayObjectContainer'),
	Stage: require('./display/Stage'),
	Sprite: require('./display/Sprite'),

	Loader: require('./loaders/Loader'),
	StageManager: require('./StageManager'),
};

PIXI.Point = bandit.Point;

export game;
export default bandit;
