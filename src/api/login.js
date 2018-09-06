import request from '@/utils/request';

export function login(username, password) {
  return request.post(process.env.PUSH_API + '/push/message/login', {}, {
    params: {
      username,
      password
    }
  });
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  });
}

export function logout(params) {
  return request({
    url: '/push/message/logout',
    method: 'get',
    params
  });
}
