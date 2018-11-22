import Request from '../../utils/request';

// 获取企业详情
export const getCompanyDetailInfo = params => Request({
  url: '/Bus/busInfo',
  method: 'POST',
  data: params,
});

