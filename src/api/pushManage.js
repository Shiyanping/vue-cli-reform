import request from '@/utils/request';

export function getPushList(params) {
  return request({
    url: process.env.PUSH_API + '/push/message/timing/module/through',
    method: 'get',
    params
  });
}

export function removeMsg(params) {
  return request.post(
    process.env.PUSH_API + '/push/message/remove/module/through',
    {},
    {
      params: params
    }
  );
}
