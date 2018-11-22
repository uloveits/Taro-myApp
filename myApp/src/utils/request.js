import Taro from '@tarojs/taro';
import { baseUrl, noConsole } from '../config';
import qs from 'qs';

export default (options = { method: 'GET', data: {} }) => {
  if (!noConsole) {
    console.log(`${new Date().toLocaleString()}【 M=${options.url} 】P=${JSON.stringify(options.data)}`);
  }
  return Taro.request({
    url: baseUrl + options.url,
    data:qs.stringify(options.data),
    //这个地方看后台接收的是什么格式的数据
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: options.method.toUpperCase(),
  }).then((res) => {
    const { statusCode, data } = res;
    if (statusCode >= 200 && statusCode < 300) {
      if (!noConsole) {
        console.log(`${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`,res.data);
      }
      if (data.status !== 1) {
        Taro.showToast({
          title: `${res.data.msg}~` || res.data.status,
          icon: 'none',
          mask: true,
        });
      }
      return data;
    } else {
      throw new Error(`网络请求错误，状态码${statusCode}`);
    }
  })
}
