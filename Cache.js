module.exports = function(length) {
	this.data = [];
	this.length = length;

	this.push = this.data.push.bind(this.data);

	this.add = item => {
		this.push(item);
		this.trim(this.length);
	};

	this.trim = length => {
		while (this.data.length > length) {
			this.data.shift();
		}
	};
};
