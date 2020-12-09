'use strict';

const { connect } = require('amqplib');

async function rabbitInit(app) {
  try {
    const { options, exchanges, queues } = app.config.rabbit;
    app.rabbit = {
      dynamicConsumer: {},
    };
    // 1. 创建链接
    const connection = await connect(options);
    app.logger.info('Rabbitmq: Connected!');
    // 2. exchanges 这里每一个交换机对应一个channel
    for (const key in exchanges) {
      const exchange = exchanges[key];
      const { name, type, durable, prefetch } = exchange;
      // 创建信道
      const channel = await connection.createChannel();
      // 断言/创建交换机
      await channel.assertExchange(name, type, { durable });
      await channel.prefetch(prefetch, false);
      app.rabbit[name] = channel;
    }
    // 3. queues
    for (const key in queues) {
      const queue = queues[key];
      const { name, exchange, pattern } = queue;
      // 断言/创建队列
      await app.rabbit[exchange].assertQueue(name);
      // 绑定交换机
      await app.rabbit[exchange].bindQueue(name, exchange, pattern);
    }
    // 监听连接断开
    connection.on('close', () => {
      rabbitInit(app);
    });
  } catch (error) {
    app.logger.error('Rabbitmq connect error:', error.message, 'Retry...');
    setTimeout(() => rabbitInit(app), 3000);
  }
}

module.exports = rabbitInit;
