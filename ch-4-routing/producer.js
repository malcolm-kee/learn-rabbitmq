const amqp = require('amqplib/callback_api');

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

    const logLevel = process.argv[2] || 'info';
    const message = process.argv.slice(3).join(' ') || 'Hello world';

    channel.publish(exchange, logLevel, Buffer.from(message));

    console.log(' [x] Sent %s with logLevel %s', message, logLevel);

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  });
});
