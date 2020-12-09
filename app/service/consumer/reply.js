'use strict';

const { Service } = require('egg');

module.exports = class extends Service {
  async consume(message) {
    const { app } = this;
    // already bind egg this
    const { fields: { routingKey }, content } = message;
    const routingKeys = routingKey.split('.');
    const service = routingKeys[2];
    await new Promise(resolve => setTimeout(resolve, 10000));
    console.log(service, '单线程消费:', new Date(), content.toString());
    await app.rabbit.REPLY.ack(message);
  }
};
