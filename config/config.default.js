/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1606892674903_8590';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.rabbit = {
    options: {
      protocol: 'amqp',
      hostname: 'localhost',
      port: 5672,
      username: 'guest',
      password: 'guest',
      vhost: 'my_vhost',
    },
    exchanges: {
      message: {
        name: 'MESSAGE',
        type: 'topic',
        durable: false,
        prefetch: 10,
      },
      reply: {
        name: 'REPLY',
        type: 'topic',
        durable: false,
        prefetch: 1,
      },
    },
    queues: {
      wechatMessage: {
        name: 'WECHAT_MESSAGE',
        pattern: 'wechat.#',
        exchange: 'MESSAGE',
      },
      wxworkMessage: {
        name: 'WXWORK_MESSAGE',
        pattern: 'wxwork.#',
        exchange: 'MESSAGE',
      },
      lineMessage: {
        name: 'LINE_MESSAGE',
        pattern: 'line.#',
        exchange: 'MESSAGE',
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
