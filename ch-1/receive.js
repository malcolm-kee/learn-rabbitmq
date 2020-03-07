const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, connection) => {
  if (err) {
    return console.log(err);
  }

  connection.createChannel((error, channel) => {
    if (error) {
      return console.log(error);
    }

    var queue = 'Hello';
    channel.assertQueue(queue, {
      durable: false,
    });

    console.log(`Waiting for message...`);

    channel.consume(
      queue,
      msg => {
        console.log(`Received ${msg.content.toString()}`);
      },
      {
        noAck: true,
      }
    );
  });
});
