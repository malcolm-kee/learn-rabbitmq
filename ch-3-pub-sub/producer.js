const ampq = require('amqplib/callback_api');

ampq.connect('amqp://localhost', (error, connection) => {
  if (error) {
    throw error;
  }

  connection.createChannel((err, channel) => {
    if (err) {
      throw err;
    }

    const exchange = 'logs';
    const message = process.argv.slice(2).join(' ') || 'Hello world';

    channel.assertExchange(exchange, 'fanout', {
      durable: false,
    });
    channel.publish(exchange, '', Buffer.from(message));
    console.log(' [x] Sent %s', message);
  });

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
});
