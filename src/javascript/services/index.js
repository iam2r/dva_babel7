import request from '../utils/request';


export const login = payload => {
  return request('/api/user/login', {
    type: 'post',
    payload
  });
}
