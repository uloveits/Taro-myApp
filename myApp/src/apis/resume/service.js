import Request from '../../utils/request';

// 获取简历列表详情
export const getResumeInfoList = params => Request({
  url: '/Person/personList',
  method: 'POST',
  data: params,
});
