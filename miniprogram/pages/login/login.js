import { sendCaptcha } from '../../service/login';
import { getFilePath } from '../../utils/index';

const phoneReg = /^1[3-9]\d{9}$/;

Page({
  /* 页面的初始数据*/
  data: {
    bgStyle: '',
    fieldStyle: 'background:rgba(0,0,0,0);',
    buttonStyle: 'width:70%;height:80rpx;margin:40rpx auto;',
    phone: '',
    captcha: '',
    captchaText: '获取验证码',
    isLegal: false,
  },

  /* 输入内容 */
  onInput(e) {
    const key = e.currentTarget.dataset.name;
    const inputVal = e.detail;
    let isLegal = false;
    if (key === 'phone' && inputVal.length === 11) {
      /* 检验输入的手机号是否合法 */
      if (!inputVal.match(phoneReg)) {
        isLegal = false;
        wx.showToast({
          icon: 'error',
          title: '手机号错误',
        });
      } else {
        isLegal = true;
      }
    }
    this.setData({ [key]: inputVal, isLegal });
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

  /* 发送验证码 */
  send() {
    console.log(this.data.phone);
  },

  /* 登录 */
  login() {
    console.log('login');
  },

  /* 生命周期函数--监听页面加载 */
  onLoad(options) {
    wx.showLoading({
      title: '加载中...',
    });
    getFilePath('paper_2').then(({ url }) => {
      this.setData({
        bgStyle: `
        background-image:url(${url});
        background-size:contain;
        background-position:center;
      `,
      });
      wx.hideLoading();
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
