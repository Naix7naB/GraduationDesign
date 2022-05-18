import { createStoreBindings } from 'mobx-miniprogram-bindings';
import { store } from '../../utils/store';

Page({
  /* 页面的初始数据 */
  data: {},

  /* 展示弹窗 */
  show(e) {
    const { name } = e.detail;
    if (name === 'login') {
      /* 跳转登录页面 */
      wx.navigateTo({
        url: `/pages/login/login`,
      });
    } else {
      /* 跳转个人信息页面 */
      wx.navigateTo({
        url: '/pages/user/detail/detail?name=personal',
      });
    }
  },

  /* 点击跳转详细页面 */
  onclick(e) {
    wx.showLoading({
      title: '加载中...',
    });
    let targetUrl = '';
    if (!this.data.isLogin) {
      /* 未登录状态 跳转登录页面 */
      targetUrl = '/pages/login/login';
    } else {
      /* 登录状态 正常跳转 */
      const { name } = e.target.dataset;
      targetUrl = `/pages/user/detail/detail?name=${name}`;
    }
    wx.navigateTo({ url: targetUrl });
  },

  /* 生命周期函数--监听页面加载 */
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['isLogin', 'userInfo'],
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
