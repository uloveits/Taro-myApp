import Request from '../../utils/request';

// 获取首页详情
export const getHomeInfo = params => Request({
  url: '/Index/index',
  method: 'POST',
  data: params,
});

