import { request } from './base';

/* 手机登录 */
export function loginByCellphone(phone, captcha) {
  return request('/login/cellphone', {
    phone,
    captcha,
  });
}

/* 发送验证码 */
export function sendCaptcha(phone) {
  return request('/captcha/sent', {
    phone,
  });
}

/* 验证验证码 */
export function verifyCaptcha(phone, captcha) {
  return request('/captcha/verify', {
    phone,
    captcha,
  });
}

/* 查看登录状态 */
export function checkLoginStatus() {
  return request('/login/status');
}

/* 登出 */
export function logout() {
  return request('/logout');
}
