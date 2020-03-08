const amqp = require('amqplib/callback_api');

const logLevels = process.argv.slice(2);

amqp.connect('amqp://localhost', (err, connection) => {
  if (err) {
    throw err;
  }

  connection.createChannel((err, channel) => {
    if (err) {
      throw err;
    }
    const exchange = 'direct_logs';

    channel.assertExchange(exchange, 'direct', {
      durable: false,
    });

    channel.assertQueue(
      '',
      {
        exclusive: true,
      },
      (err, q) => {
        if (err) {
          throw err;
        }

        if (logLevels.length > 0) {
          logLevels.forEach(logLevel => {
            channel.bindQueue(q.queue, exchange, logLevel);
            console.log('Consuming logs with logLevel %s', logLevel);
          });
        } else {
          // this doesn't work
          // channel.bindQueue(q.queue, exchange, '');
          // console.log('Consuming logs with all levels');

          // instead, you must listen to specific logLevel
          channel.bindQueue(q.queue, exchange, 'info');
          console.log('Consuming logs with info level only');
        }

        channel.consume(
          q.queue,
          msg => {
            if (msg.content) {
              console.log('Received: %s', msg.content.toString());
            }
          },
          {
            noAck: true,
          }
        );
      }
    );
  });
});
