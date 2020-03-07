const amqp = require('amqplib/callback_api');

amqp.connect(
  {
    heartbeat: 5,
  },
  (err, connection) => {
    if (err) {
      return console.error(err);
    }

    connection.createChannel((error, channel) => {
      if (error) {
        return console.error(error);
      }

      var queue = 'work_queue';
      var msg = process.argv.slice(2).join(' ') || 'Hello World';

      // both assertQueue durable: true and sendToQueue persistent: true are required
      // to make the message persistent
      channel.assertQueue(queue, {
        durable: true,
      });

      channel.sendToQueue(queue, Buffer.from(msg), {
        persistent: true,
      });
      console.log(`send ${msg}`);

      setTimeout(() => {
        connection.close();
        process.exit(1);
      }, 200);
    });
  }
);
