var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, connection) => {
  if (err) {
    return console.error(err);
  }

  connection.createChannel((error, channel) => {
    if (error) {
      return console.error(error);
    }

    var queue = 'Hello';
    var message = 'Hello World!';

    channel.assertQueue(queue, {
      durable: false,
    });

    channel.sendToQueue(queue, Buffer.from(message));
    console.log(`send ${message}`);

    setTimeout(() => {
      connection.close();
      process.exit(1);
    }, 1000);
  });
});
