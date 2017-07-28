var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redis = require('redis').createClient({
	host: 'redis'
});
var Message = require('./Message.js');
var port = process.env.PORT || 8000;

app.use(express.static('public'));
app.use(express.static('bower_components'));

var redisPrefix = 'socket-chat:';
redis.on('error', function(err) {
	console.log('Error ' + err);
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	socket.on('message', function(incoming) {
		new Message({
			hex: incoming.hex,
			channel: 'message',
			text: incoming.text
		}).send(io).log(redis);
	});

	socket.on('join', function(hex) {
		new Message({
			hex: hex,
			channel: 'note',
			text: hex + ' joined (' + io.engine.clientsCount + ')'
		}).send(io).log(redis);
	});

	socket.on('disconnect', function() {
		new Message({
			hex: null,
			channel: 'note',
			text: 'Someone quit (' + io.engine.clientsCount + ')'
		}).send(io).log(redis);
	});
});

app.get('/api/messages', function(req, res) {
	redis.lrange(redisPrefix + 'log', 0, -1, function(err, items) {
		if (err) return err;

		res.send(items.map(function(item) {
			return {
				timestamp: item.split(':')[0],
				hex: item.split(':')[1],
				channel: item.split(':')[2],
				text: item.split(':')[3],
			};
		}));
	});
});

app.get('/api/reload/:secret', function(req, res) {
	if (req.params.secret === 'secret') {
		new Message({
			hex: null,
			channel: 'refresh',
			text: 'Forcing refresh'
		}).send();
		res.send({
			result: 'sent'
		});
	} else {
		res.send({
			result: 'Invalid secret'
		});
	}
});

http.listen(port, function() {
	console.log('Listening on port %s', port);
});
