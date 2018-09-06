import request from '@/utils/request';

export function getHandList(params) {
  return request.post(process.env.NE_API + '/push/getHandWritingArticles.do', {}, {
    params: params
  });
}
