# Routing with competing consumers

- Start `consumer.js` only once
- You can starts `consumer-plain.js` multiple instances
- Now when you run `producer.js`, the message will be consumed by `consumer.js` and `consumer-plain.js` in round-robin order.
