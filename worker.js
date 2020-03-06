const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (err, connection) => {
  if (err) {
    return console.log(err);
  }

  connection.createChannel((error, channel) => {
    if (error) {
      return console.log(error);
    }

    var queue = "work_queue";
    channel.assertQueue(queue, {
      durable: true
    });
    channel.prefetch(1);

    channel.consume(
      queue,
      msg => {
        var secs = msg.content.toString().split(".").length - 1;

        console.log(`Received ${msg.content.toString()}`);

        setTimeout(() => {
          console.log("Done");
          channel.ack(msg);
        }, secs * 2000);
      },
      {
        noAck: false
      }
    );
  });
});
