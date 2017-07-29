var socket = io();
var myHex = randomColor({luminosity: 'light'});
var input = $('#m');
var messages = $('#messages');

// Announce join and register a hex
$(function() {
	socket.emit('join', myHex);
	input.focus();
	$("form").css('background-color', myHex);

	// Load previous messages from log
	$.get('/api/messages', function(data) {

		data.sort(function(a, b) {
			return a.timestamp - b.timestamp;
		});

		$.each(data, function(key, item) {
			new Message({
				hex: item.hex,
				channel: item.channel,
				text: item.text
			}).render(messages);
		});
	});

});

// Send message to server if it's not blank
$('form').submit(function() {

	text = input.val();

	if (/\S/.test(text)) {
		new Message({
			hex: myHex,
			channel: 'message',
			text: text
		}).send(socket);

		input.val('');
	}

	return false;
});

socket.on('message', function(msg) {
	console.log(msg);
	new Message({
		hex: msg.hex,
		channel: 'message',
		text: msg.text
	}).render(messages);
});

socket.on('note', function(msg) {
	console.log(msg);
	new Message({
		hex: msg.hex,
		channel: 'note',
		text: msg.text
	}).render(messages);
});

socket.on('refresh', function(msg) {
	console.log(msg);
	new Message({
		hex: msg.hex,
		channel: 'refresh',
		text: msg.text
	}).render(messages);
	setTimeout(function() {
		window.location.reload();
	}, 2000);
});
