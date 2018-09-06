import request from '@/utils/request';

export function pushMsg(params) {
  return request.post(process.env.PUSH_API + '/push/message/send/module/through', {}, {
    params: params
  });
}

// 获取pushID
export function getPushId(params) {
  return request({
    url: process.env.NE_API + '/push/getPushID.do',
    method: 'get',
    params
  });
}
