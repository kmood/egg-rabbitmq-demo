'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;
    const { message } = app.config.rabbit.exchanges;
    const { MESSAGE } = app.rabbit;
    for (let i = 0; i < 5; i++) {
      // 常规
      await MESSAGE.publish(message.name, 'wechat.chatroom.MOCK_CHATROOM', Buffer.from('微信普通群' + i));
      await MESSAGE.publish(message.name, 'wechat.person.MOCK_CUSROMER', Buffer.from('微信个人' + i));
      await MESSAGE.publish(message.name, 'wechat.im_chatroom.MOCK_IM', Buffer.from('微信企业群' + i));
      await MESSAGE.publish(message.name, 'wxwork.person.MOCK_CUSROMER', Buffer.from('企业个人' + i));
      await MESSAGE.publish(message.name, 'line.person.MOCK_CUSROMER', Buffer.from('line个人' + i));
    }
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
