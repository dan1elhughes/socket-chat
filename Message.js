function Message(options) {
	this.hex = options.hex;
	this.channel = options.channel;
	this.text = options.text;
}

Message.prototype = {
	send: function(io) {
		io.emit(this.channel, {
			hex: this.hex,
			text: this.text
		});
		return this;
	},

	log: function(redis) {
		redis.lpush('socket-chat:log', [
			Date.now(),
			this.hex,
			this.channel,
			this.text
		].join(':'));
		redis.ltrim('socket-chat:log', 0, 30);
		return this;
	},
};

module.exports = Message;
