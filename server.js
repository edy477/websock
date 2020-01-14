'use strict';

const express = require('express');
const { Server } = require('ws');
const WebSocket = require('ws');
const PORT = process.env.PORT || 5000;
const INDEX = '/index.html';

const server = express()
    .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));







//const wss = new WebSocket.Server(undefined, );
 const wss = new Server({ server });
console.log("websocket server created");
wss.on('connection', function connection(ws) {


    ws.on('message', function incoming(data) {
        // eslint-disable-next-line no-unused-vars


        // eslint-disable-next-line no-console
        console.log("websocket connection open");
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                console.log(data);
                client.send(data);

            }
        });




        wss.on("close", function() {
            // eslint-disable-next-line no-console
            console.log("websocket connection close");

        })

    });
});
