'use strict';

const { Service } = require('egg');

module.exports = class extends Service {
  async consume(message) {
    // already bind this
    const { ctx, app } = this;
    const { fields: { routingKey }, content } = message;
    const routingKeys = routingKey.split('.');
    const client = routingKeys[0];
    const type = routingKeys[1];
    const from = routingKeys[2];
    ctx.logger.info(`client = ${client}, type = ${type}, from = ${from}, content = ${content.toString()}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await app.rabbit.ack(message);
  }
};
