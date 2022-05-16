import { createStoreBindings } from 'mobx-miniprogram-bindings';
import { store } from '../../utils/store';

const app = getApp();

Page({
  /* 页面的初始数据 */
  data: {
    openId: app.globalData.openId,
  },

  /* 展示弹窗 */
  show() {
    this.selectComponent('#dialog').show();
  },

  /* 点击登录授权 */
  login() {
    return;
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
          title: result.message,
          icon: 'none',
        });
        this.setLoginState(true);
        this.setUserInfo(result.data);
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
      complete: () => {
        this.selectComponent('#dialog').hide();
      },
    });
  },

  onclick() {
    // wx.cloud.callFunction({ name: 'getProvince' }).then(({ result }) => {
    //   console.log(result.provinceList);
    // });
    wx.cloud
      .callFunction({
        name: 'getSchool',
        data: { province: '福建省' },
      })
      .then(({ result }) => {
        console.log(result.schools);
      });
  },

  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['isLogin', 'userInfo'],
      actions: ['setLoginState', 'setUserInfo'],
    });
  },

  /* 生命周期函数--监听页面卸载 */
  onUnload: function () {
    this.storeBindings.destroyStoreBindings();
  },

  /* 页面相关事件处理函数--监听用户下拉动作 */
  onPullDownRefresh: function () {},

  /* 页面上拉触底事件的处理函数 */
  onReachBottom: function () {},
});
