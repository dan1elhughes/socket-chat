module.exports = function(options) {
	this.hex = options.hex;
	this.channel = options.channel;
	this.text = options.text;

	this.send = io => {
		io.emit(this.channel, {
			hex: this.hex,
			text: this.text,
		});
		return this;
	},

	this.log = cache => {
		cache.add([
			Date.now(),
			this.hex,
			this.channel,
			this.text,
		]);
		return this;
	};
};
