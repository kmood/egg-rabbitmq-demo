'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;
    for (let i = 0; i < 5; i++) {
      await app.rabbit.publish(app.config.rabbit.exchanges.message.name, 'wechat.chatroom.MOCK_CHATROOM', Buffer.from('微信普通群' + i));
      await app.rabbit.publish(app.config.rabbit.exchanges.message.name, 'wechat.person.MOCK_CUSROMER', Buffer.from('微信个人' + i));
      await app.rabbit.publish(app.config.rabbit.exchanges.message.name, 'wechat.im_chatroom.MOCK_IM', Buffer.from('微信企业群' + i));
      await app.rabbit.publish(app.config.rabbit.exchanges.message.name, 'wxwork.person.MOCK_CUSROMER', Buffer.from('企业个人' + i));
      await app.rabbit.publish(app.config.rabbit.exchanges.message.name, 'line.person.MOCK_CUSROMER', Buffer.from('line个人' + i));
      await app.rabbit.publish(app.config.rabbit.exchanges.reply.name, 'wechat.CHATROOM.MOCK_CHATROOM', Buffer.from('微信普通群 回复' + i));
      await app.rabbit.publish(app.config.rabbit.exchanges.reply.name, 'wechat.person.MOCK_CUSROMER', Buffer.from('微信个人 回复' + i));
      await app.rabbit.publish(app.config.rabbit.exchanges.reply.name, 'wechat.im_chatroom.MOCK_IM', Buffer.from('微信企业群 回复' + i));
      await app.rabbit.publish(app.config.rabbit.exchanges.reply.name, 'wxwork.person.MOCK_CUSROMER', Buffer.from('企业个人 回复' + i));
      await app.rabbit.publish(app.config.rabbit.exchanges.reply.name, 'line.person.MOCK_CUSROMER', Buffer.from('line个人 回复' + i));
    }
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
