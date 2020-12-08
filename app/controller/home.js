'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;
    for (let i = 0; i < 5; i++) {
      await app.rabbit.publish(app.config.rabbit.exchanges.message.name, 'chatroom.wechat', Buffer.from('微信普通群' + i));
      await app.rabbit.publish(app.config.rabbit.exchanges.message.name, 'person.wechat', Buffer.from('微信个人' + i));
      await app.rabbit.publish(app.config.rabbit.exchanges.message.name, 'im_chatroom.wechat', Buffer.from('微信企业群' + i));
      await app.rabbit.publish(app.config.rabbit.exchanges.message.name, 'person.wxwork', Buffer.from('企业个人' + i));
      await app.rabbit.publish(app.config.rabbit.exchanges.message.name, 'person.line', Buffer.from('line个人' + i));

      await app.rabbit.publish(app.config.rabbit.exchanges.reply.name, 'CHATROOM.wechat', Buffer.from('微信普通群 回复' + i));
      await app.rabbit.publish(app.config.rabbit.exchanges.reply.name, 'person.wechat', Buffer.from('微信个人 回复' + i));
      await app.rabbit.publish(app.config.rabbit.exchanges.reply.name, 'im_chatroom.wechat', Buffer.from('微信企业群 回复' + i));
      await app.rabbit.publish(app.config.rabbit.exchanges.reply.name, 'person.wxwork', Buffer.from('企业个人 回复' + i));
      await app.rabbit.publish(app.config.rabbit.exchanges.reply.name, 'person.line', Buffer.from('line个人 回复' + i));
    }
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
