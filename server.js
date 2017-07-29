const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Cache = require('./Cache');
const Message = require('./Message.js');
const port = process.env.PORT || 3000;

let cache = new Cache(30);

app.use(express.static('public'));
app.use(express.static('bower_components'));

io.on('connection', socket => {

	let hex;

	socket.on('join', colour => {
		hex = colour;
		new Message({
			hex: hex,
			channel: 'note',
			text: hex + ' joined (' + io.engine.clientsCount + ')',
		}).send(io).log(cache);
	});

	socket.on('message', incoming => {
		new Message({
			hex: incoming.hex,
			channel: 'message',
			text: incoming.text,
		}).send(io).log(cache);
	});

	socket.on('disconnect', () => {
		new Message({
			hex: hex,
			channel: 'note',
			text: `${hex} quit (${io.engine.clientsCount})`,
		}).send(io).log(cache);
	});
});

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

app.get('/api/messages', (req, res) => res.send(cache.data.map(item => ({
	timestamp: item[0],
	hex: item[1],
	channel: item[2],
	text: item[3],
}))));

app.get('/api/reload', (req, res) => {
	new Message({
		hex: null,
		channel: 'refresh',
		text: 'Forcing refresh',
	}).send(io);

	res.sendStatus(200);
});

http.listen(port, () => console.log(`Listening on port ${port}`));
