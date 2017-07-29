Socket chat
================

A server for running a WebSocket-based anonymous chat, and an experiment in building Docker images.

## Docker

### Run

- `docker run -p 30000:3000 dan1elhughes/socket-chat`
- Open `localhost:30000` on the exposed port in a browser

### Build

- `docker build -t dan1elhughes/socket-chat .`

## Locally

### Run

- Build the application locally using instructions below.
- `npm start`
- Open `localhost:3000` on the exposed port in a browser

### Build

- `npm install`
- `npm run bower`
