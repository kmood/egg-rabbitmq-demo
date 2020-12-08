'use strict';
const rabbitmq = require('./app/mq/rabbit');
// app.js
class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用
  }

  async didLoad() {
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务

    // 例如：创建自定义应用的示例
  }

  async willReady() {
    const { app } = this;
    // 所有的插件都已启动完毕，但是应用整体还未 ready
    // 可以做一些数据初始化等操作，这些操作成功才会启动应用

    // 消息队列
    await rabbitmq(app);
    if (!app.rabbit) process.exit();
    app.rabbit.on('close', async () => {
      await rabbitmq(app);
    });
  }

  async didReady() {
    // 应用已经启动完毕
    const { app } = this;
    const ctx = await app.createAnonymousContext();

    // 消息队列消费者 此处拿到ctx对象可以调用service
    await app.rabbit.consume('WECHAT_MESSAGE', ctx.service.consumer.demo.consume.bind(ctx.service.consumer.demo));
    await app.rabbit.consume('WXWORK_MESSAGE', ctx.service.consumer.demo.consume.bind(ctx.service.consumer.demo));
    await app.rabbit.consume('LINE_MESSAGE', ctx.service.consumer.demo.consume.bind(ctx.service.consumer.demo));

    await app.rabbit.consume('WECHAT_REPLY', ctx.service.consumer.demo.consume.bind(ctx.service.consumer.demo));
    await app.rabbit.consume('WXWORK_REPLY', ctx.service.consumer.demo.consume.bind(ctx.service.consumer.demo));
    await app.rabbit.consume('LINE_REPLY', ctx.service.consumer.demo.consume.bind(ctx.service.consumer.demo));
  }

  async serverDidReady() {
    // http / https server 已启动，开始接受外部请求
    // 此时可以从 app.server 拿到 server 的实例
  }
}

module.exports = AppBootHook;
