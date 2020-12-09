'use strict';

const { Subscription } = require('egg');

class CleanCompletedJob extends Subscription {
  static get schedule() {
    return {
      interval: '5s',
      type: 'worker',
      env: [ 'local', 'prod' ],
    };
  }
  async subscribe() {
    const _egg = this;
    const { ctx, app } = this;
    const accounts = [{
      id: 1,
      client: 'wechat',
      type: 'chatroom',
    },
    {
      id: 2,
      client: 'wechat',
      type: 'person',
    }];
    accounts.forEach(async account => {
      if (!account.client || !account.type) return;
      // assert Queue
      const result = await app.rabbit.REPLY.assertQueue(`REPLY_JOB_${account.id}`);
      console.log('Queue Info: ', result);
      // 绑定交换机
      await app.rabbit.REPLY.bindQueue(result.queue, 'REPLY', `#.${account.id}`);
      await app.rabbit.REPLY.publish('REPLY', `${account.client}.${account.type}.${account.id}`, Buffer.from(account.id.toString()));
      // consumer单例
      if (!app.rabbit.dynamicConsumer[result.queue]) {
        app.rabbit.dynamicConsumer[result.queue] = app.rabbit.REPLY.consume(result.queue, ctx.service.consumer.reply.consume.bind(_egg));
      }
    });
  }
}

module.exports = CleanCompletedJob;
