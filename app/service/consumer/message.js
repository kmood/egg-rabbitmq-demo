'use strict';

const { Service } = require('egg');

module.exports = class extends Service {
  async consume(message) {
    // already bind egg this
    const { fields: { routingKey }, content } = message;
    console.log(routingKey, content.toString());
  }
};
