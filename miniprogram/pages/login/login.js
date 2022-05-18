import { createStoreBindings } from 'mobx-miniprogram-bindings';
import { store } from '../../utils/store';
import { sendCaptcha, verifyCaptcha, loginByCellphone } from '../../service/login';
import { getFilePath } from '../../utils/index';
import storage from '../../utils/storage';

const app = getApp();
const phoneReg = /^1[3-9]\d{9}$/;
let timer = null;

Page({
  /* 页面的初始数据*/
  data: {
    openId: app.globalData.openId,
    bgStyle: '',
    fieldStyle: 'background:rgba(0,0,0,0);',
    buttonStyle: 'width:70%;height:80rpx;margin:40rpx auto;',
    phone: '',
    captcha: '',
    captchaText: '获取验证码',
    isLegal: false,
    locked: false,
  },

  /* 输入内容 */
  onInput(e) {
    const key = e.currentTarget.dataset.name;
    const inputVal = e.detail;
    this.setData({ [key]: inputVal });
    if (key === 'phone') {
      /* 检验输入的手机号是否合法 */
      let isLegal = false;
      if (inputVal.match(phoneReg)) {
        isLegal = true;
      } else {
        isLegal = false;
        if (inputVal.length === 11) {
          wx.showToast({
            icon: 'error',
            title: '手机号格式错误',
          });
        }
      }
      this.setData({ isLegal });
    }
  },

  /* 清空输入框 */
  clear(e) {
    const key = e.currentTarget.dataset.name;
    const inputVal = e.detail;
    this.setData({ [key]: inputVal });
    if (key === 'phone') {
      this.setData({ isLegal: false });
    }
  },

  /* 获取验证码 */
  send() {
    /* 节流阀 */
    if (this.data.locked) {
      wx.showToast({
        icon: 'none',
        title: this.data.captchaText,
      });
      return;
    }
    this.data.locked = true;

    let sec = 60,
      txt = '';
    this.setData({ captchaText: `${sec}s后重试` });
    timer = setInterval(() => {
      if (--sec === 0) {
        clearInterval(timer);
        txt = '获取验证码';
        this.data.locked = false;
      } else {
        txt = `${sec}s后重试`;
      }
      this.setData({ captchaText: txt });
    }, 1000);
    sendCaptcha(this.data.phone);
  },

  /* 登录 */
  login() {
    const { phone, captcha, isLegal } = this.data;
    if (!isLegal || !captcha) {
      /* 手机号不合法或者验证码为空 则不能点击登录按钮 */
      const title = !isLegal ? '手机号格式错误' : '验证码为空';
      wx.showToast({ icon: 'error', title });
    } else {
      /* 验证验证码 */
      verifyCaptcha(phone, captcha).then(async (res) => {
        if (res.code !== 200) {
          /* 验证码错误 */
          wx.showToast({
            icon: 'error',
            title: res.message,
          });
        } else {
          /* 验证码正确 */
          try {
            /* 用户微信授权 */
            wx.getUserProfile({
              desc: '获取用户信息',
              success: async ({ userInfo }) => {
                /* 授权成功 */
                const { result } = await wx.cloud.callFunction({
                  name: 'login',
                  data: {
                    ...userInfo,
                    openid: this.data.openId,
                  },
                });
                wx.showToast({
                  icon: 'none',
                  title: result.message,
                });
                const { token } = await loginByCellphone(phone, captcha);
                storage.setLocal('_token_', token);
                this.setLoginState(true);
                this.setUserInfo(result.data);
                /* 跳转个人主页 */
                wx.reLaunch({
                  url: '/pages/user/user',
                });
              },
              fail: ({ errMsg }) => {
                /* 授权失败 */
                wx.showToast({
                  title: '您已拒绝登录',
                  icon: 'none',
                });
                this.setLoginState(false);
                console.error(errMsg);
              },
            });
          } catch (err) {
            console.error(err);
          }
        }
      });
    }
  },

  /* 生命周期函数--监听页面加载 */
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['isLogin', 'userInfo'],
      actions: ['setLoginState', 'setUserInfo'],
    });
    wx.showLoading({
      title: '加载中...',
    });
    getFilePath('paper_2')
      .then(({ url }) => {
        this.setData({ bgStyle: `background-image:url(${url});` });
        wx.hideLoading();
      })
      .catch((err) => {
        console.error(err);
        wx.hideLoading();
        wx.reLaunch({
          url: '/pages/user/user',
        });
      });
  },

  /* 生命周期函数--监听页面卸载 */
  onUnload() {
    timer = null;
    this.storeBindings.destroyStoreBindings();
  },
});
