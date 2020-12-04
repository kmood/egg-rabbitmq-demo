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
        type: 'direct',
        durable: false,
        queues: [
          {
            name: 'customer',
            pattern: 'CUSTOMER.*',
          },
          {
            name: 'service',
            pattern: 'SERVICE.*',
          },
        ],
      },
      reply: {
        name: 'REPLY',
        type: 'direct',
        durable: false,
        queues: [
          {
            name: 'person',
            pattern: 'PERSON.*',
          },
          {
            name: 'chatroom',
            pattern: 'CHATROOM.*',
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
