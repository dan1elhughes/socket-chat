Socket chat
================

A server for running a WebSocket-based anonymous chat, and an experiment in building Docker images.

Run in Docker
-----------------

- `docker run -p 30000:3000 dan1elhughes/chat`
- Open `localhost:30000` on the exposed port in a browser

Run locally
-----------------

- Build the application locally using instructions below.
- `npm start`
- Open `localhost:3000` on the exposed port in a browser

Build locally
-----------------

- `npm install`
- `npm run bower`

Build in Docker
-----------------

- `docker build -t dan1elhughes/chat .`
