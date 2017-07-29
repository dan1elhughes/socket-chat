function Message(options) {
	this.hex = options.hex;
	this.channel = options.channel;
	this.text = options.text;
	this.linker = new Autolinker();
}

Message.prototype = {
	send: function(io) {
		io.emit(this.channel, {
			hex: this.hex,
			text: this.text
		});
		return this;
	},

	render: function(parent) {
		var $el = $('<li>');
		$el.addClass(this.channel);

		if (this.hex) {
			$el.css('background-color', this.hex);
		}

		var text = unescape(this.text);

		$el.html(this.linker.link(text));

		parent.append($el);
		window.scrollTo(0,document.body.scrollHeight);
		return this;
	},
};
