/*
 * @Author: Rainy [https://github.com/rain120]
 * @Date: 2020-12-05 20:18:35
 * @LastEditors: Rainy
 * @LastEditTime: 2020-12-05 20:57:08
 */
import baseJest from '../../jest.config.base';

export default {
  ...baseJest,
  roots: ['./__tests__'],
  name: require('./package').name,
  displayName: require('./package').name,
};
