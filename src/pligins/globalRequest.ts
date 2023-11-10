/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { history } from 'umi';
import { stringify } from 'querystring';
import { message } from 'antd';

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  credentials: 'include', // 默认请求是否带上cookie
  prefix: process.env.NODE_ENV === 'production' ? '' : undefined,
  // requestType: 'form',
});

/**
 * 所以请求拦截器
 */
request.interceptors.request.use((url, options): any => {
  console.log('｜-🚀-｜ request url =>', url, '｜-🚀-｜');
  return {
    url,
    options: {
      ...options,
      headers: {
        // Authorization: getAccessToken(),
      },
    },
  };
});

/**
 * 所有响应拦截器
 */
request.interceptors.response.use(async (response, options): Promise<any> => {
  const data = await response.clone().json();
  console.log('｜-🚀-｜ response data =>', data, '｜-🚀-｜');
  if (data.code === 0) {
    return data.data;
  }
  if (data.code === 40100) {
    message.error(data.description);
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: location.pathname,
      }),
    });
  } else {
    message.error(data.description);
  }
});

export default request;
