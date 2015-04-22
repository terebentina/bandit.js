class EventEmitter {
	constructor() {
		this._listeners = {};
	}

	listeners(eventName) {
		return this._listeners[eventName] ? this._listeners[eventName].slice() : [];
	}

	emit(eventName, data) {
		//backwards compat with old method ".emit({ type: 'something' })"
		if (typeof eventName === 'object') {
			data = eventName;
			eventName = eventName.type;
		}

		//ensure we are using a real pixi event
		if (!data || data.__isEventObject !== true) {
			data = new PIXI.Event(this, eventName, data);
		}

		//iterate the listeners
		if (this._listeners && this._listeners[eventName]) {
			let listeners = this._listeners[eventName].slice(0);
			let length = listeners.length;
			let fn = listeners[0];
			let i;

			for (i = 0; i < length; fn = listeners[++i]) {
				//call the event listener
				fn.call(this, data);

				//if "stopImmediatePropagation" is called, stop calling sibling events
				if (data.stoppedImmediate) {
					return this;
				}
			}

			//if "stopPropagation" is called then don't bubble the event
			if (data.stopped) {
				return this;
			}
		}

		//bubble this event up the scene graph
		if (this.parent && this.parent.emit) {
			this.parent.emit.call(this.parent, eventName, data);
		}

		return this;
	}

	on(eventName, fn) {
		(this._listeners[eventName] = this._listeners[eventName] || []).push(fn);
		return this;
	}

	once(eventName, fn) {
		let self = this;

		function onceHandlerWrapper() {
			fn.apply(self.off(eventName, onceHandlerWrapper), arguments);
		}

		onceHandlerWrapper._originalHandler = fn;

		return this.on(eventName, onceHandlerWrapper);
	}

	off(eventName, fn) {
		if (!this._listeners[eventName])
			return this;

		let list = this._listeners[eventName], i = fn ? list.length : 0;

		while (i-- > 0) {
			if (list[i] === fn || list[i]._originalHandler === fn) {
				list.splice(i, 1);
			}
		}

		if (list.length === 0) {
			delete this._listeners[eventName];
		}

		return this;
	}

	removeAllListeners(eventName) {
		delete this._listeners[eventName];
		return this;
	}
};

export default EventEmitter;
