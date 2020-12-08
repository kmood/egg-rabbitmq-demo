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
        queues: [
          {
            name: 'WECHAT_MESSAGE',
            pattern: '*.wechat',
          },
          {
            name: 'WXWORK_MESSAGE',
            pattern: '*.wxwork',
          },
          {
            name: 'LINE_MESSAGE',
            pattern: '*.line',
          },
        ],
      },
      reply: {
        name: 'REPLY',
        type: 'topic',
        durable: false,
        queues: [
          {
            name: 'WECHAT_REPLY',
            pattern: '*.wechat',
          },
          {
            name: 'WXRORK_REPLY',
            pattern: '*.wxwork',
          },
          {
            name: 'LINE_REPLY',
            pattern: '*.line',
          },
        ],
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
