const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, connection) => {
  if (err) {
    throw err;
  }

  connection.createChannel((error, channel) => {
    if (error) {
      throw error;
    }

    const exchange = 'logs';

    channel.assertExchange(exchange, 'fanout', {
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

        console.log(
          '[*] Waiting message in %s. To exit press Ctrl + C',
          q.queue
        );

        channel.bindQueue(q.queue, exchange, '');
        channel.prefetch(1);

        channel.consume(
          q.queue,
          msg => {
            if (msg.content) {
              console.log(' [x] %s', msg.content.toString());
            }

            setTimeout(() => {
              channel.ack(msg);
            }, 500);
          },
          {
            noAck: false,
          }
        );
      }
    );
  });
});
