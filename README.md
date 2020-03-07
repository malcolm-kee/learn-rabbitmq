# learn-rabbitmq

Exercise to explore [RabbitMQ](https://www.rabbitmq.com/).

## Terminology

1. Producer: an application that generates message
1. Queue: a buffer that stores messages from producer to consumer
1. Consumer: an application that receives message

Producer never interacts with queue directly, instead it talks to exchange.
