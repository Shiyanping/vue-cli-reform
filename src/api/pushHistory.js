import request from '@/utils/request';

export function getHistoryList(params) {
  return request({
    url: process.env.PUSH_API + '/push/message/history/module/through',
    method: 'get',
    params
  });
}
