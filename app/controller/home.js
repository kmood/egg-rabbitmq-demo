'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;
    for (let i = 0; i < 100; i++) {
      await app.rabbit.publish(app.config.rabbit.exchanges.message.name, 'customer.MOCK01', Buffer.from('customer' + i));
      await app.rabbit.publish(app.config.rabbit.exchanges.message.name, 'customer.MOCK02', Buffer.from('customer' + i));
      await app.rabbit.publish(app.config.rabbit.exchanges.message.name, 'service', Buffer.from('service' + i));
      await app.rabbit.publish(app.config.rabbit.exchanges.reply.name, 'person', Buffer.from('Reply' + i));
      await app.rabbit.publish(app.config.rabbit.exchanges.reply.name, 'chatroom', Buffer.from('Reply' + i));
    }
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
