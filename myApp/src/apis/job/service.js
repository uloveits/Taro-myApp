import Request from '../../utils/request';

// 获取工作列表详情
export const getJobInfoList = params => Request({
  url: '/Job/jobList',
  method: 'POST',
  data: params,
});
