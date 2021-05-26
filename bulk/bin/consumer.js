#!/usr/bin/env node

var amqp = require('amqplib');
var sleep = require('sleep');
var hri = require('human-readable-ids').hri;

printbulk = (bulk) => {
  let printablebulk = [];
  
  for (item of bulk) {
    printablebulk.push(item.content.toString());
  }

  return printablebulk.join(', ');
}

amqp.connect('amqp://rabbitmq').then(function(conn) {
  process.once('SIGINT', function() { conn.close(); });
  return conn.createChannel().then(async function(ch) {
    consumerName = hri.random();

    const bulkSize = 4;
    const queueName = 'hello';

    ch.prefetch(bulkSize);

    var ok = ch.assertQueue(queueName, {durable: false});

    ok = ok.then(function(_qok) {
      let bulk = [];
      return ch.consume(queueName, async function(msg) {
        try {
          // Count the messages so we don't get stuck when queue is empty
          const { messageCount } = await ch.checkQueue(queueName);

          // Push message in bulk
          bulk.push(msg);
  
          // Sometimes shit happen
          if (Math.floor(Math.random() * 20) == 0) {
            throw Error("Something wrong happen !!!!");
          }
  
          if (bulk.length >= bulkSize || messageCount == 0) {
            // Fake heavy bulk processing
            sleep.sleep(Math.floor(Math.random() * 5) + 1);

            // Ack each messages of the bulk
            for (item of bulk) {
              ch.ack(item);
            }

            console.log("[%s] [x] Processed (%s) '%s'", consumerName, bulk.length, printbulk(bulk));
            bulk = [];
          }
        // An error occur let's nack messages so they go back in queue
        } catch (e) {
          
          // Nack each message of the bulk
          for (item of bulk) {
            ch.nack(item);
          }

          console.log("[%s] [o] Error ! Nacked (%s) %s", consumerName, bulk.length, printbulk(bulk));
          bulk = [];
        }
      });
    });

    return ok.then(function(_consumeOk) {
      //console.log('[%s] [*] Waiting for messages. To exit press CTRL+C', consumerName);
    });
  });
}).catch(console.warn);
