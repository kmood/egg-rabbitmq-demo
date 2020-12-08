'use strict';

const { connect } = require('amqplib');

async function rabbitInit(app) {
  try {
    const { options, exchanges } = app.config.rabbit;
    // 1. 创建链接
    const connection = await connect(options);
    app.logger.info('Rabbitmq: Connected!');
    // TODO： 创建多个channel
    // 2. 创建channel
    const channel = await connection.createChannel();
    for (const key in exchanges) {
      const { name, type, durable, queues } = exchanges[key];
      await channel.assertExchange(name, type, { durable });
      await channel.prefetch(1, false); // global设置为false，该数值只对当前 channel有效
      for (const queue of queues) {
        await channel.assertQueue(queue.name);
        await channel.bindQueue(queue.name, name, queue.pattern);
      }
    }
    app.rabbit = channel;
  } catch (error) {
    app.logger.error('Rabbitmq connect error:', error.message, 'Retry...');
    setTimeout(() => rabbitInit(app), 3000);
  }
}

module.exports = rabbitInit;
