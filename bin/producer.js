#!/usr/bin/env node

var amqp = require('amqplib');
var hri = require('human-readable-ids').hri;

amqp.connect('amqp://rabbitmq').then(function(conn) {
  return conn.createChannel().then(function(ch) {
    var q = 'hello';
    var ok = ch.assertQueue(q, {durable: false});

    return ok.then(function(_qok) {
      // NB: `sentToQueue` and `publish` both return a boolean
      // indicating whether it's OK to send again straight away, or
      // (when `false`) that you should wait for the event `'drain'`
      // to fire before writing again. We're just doing the one write,
      // so we'll ignore it.
      for (let i = 0; i < 27; i++) {
        const msg = hri.random();

        ch.sendToQueue(q, Buffer.from(msg));
        console.log(" [x] Sent '%s'", msg);
    }
      return ch.close();
    });
  }).finally(function() { conn.close(); });
}).catch(console.warn);
