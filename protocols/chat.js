'use strict'

const pipe = require('it-pipe');

const PROTOCOL = '/libp2p/chat/1.0.0';

async function handler({ connection, stream }) {
    try {
        await pipe(
            stream,
            async function (source) {
                for await (const message of source) {
                    console.log(`${connection.remotePeer.toB58String().slice(0, 8)} : ${string(message)}`)
                }
            }
        )

        await pipe([], stream)
    } catch(error) {
        console.log(error)
    }
}

async function send({ message, stream }) {
    try {
        await pipe(
            [message],
            stream,
            async function (source) {
                for await (const message of source) {
                    console.log(` Me: ${string(message)} `)
                }
            }
        )
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    PROTOCOL,
    handler,
    send,
}