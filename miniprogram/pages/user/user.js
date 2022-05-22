import { createStoreBindings } from 'mobx-miniprogram-bindings';
import { store } from '../../utils/store';

const app = getApp();

Page({
  /* 页面的初始数据 */
  data: {
    openId: app.globalData.openId,
  },

  /* 跳转页面 */
  navigator(e) {
    const { name } = e.detail;
    if (name === 'login') {
      /* 跳转登录页面 */
      wx.navigateTo({
        url: `/pages/login/login`,
      });
    } else {
      /* 跳转个人信息页面 */
      wx.navigateTo({
        url: '/pages/userDetail/userDetail?name=personal',
      });
    }
  },

  /* 签到 */
  sign(e) {
    /* 未登录状态 显示弹窗 */
    if (!this.data.isLogin) return this.dialog.show();
    /* 已签到 */
    if (this.data.isSigned) return;
    const { point } = e.detail;
    wx.cloud
      .callFunction({
        name: 'updateUserInfo',
        data: {
          openId: this.data.openId,
          point: point + 10,
        },
      })
      .then(() => {
        wx.showToast({
          icon: 'none',
          title: '签到成功',
        });
        this.setSignState(true);
      });
  },

  /* 点击跳转详细页面 */
  onclick(e) {
    /* 未登录状态 显示弹窗 */
    if (!this.data.isLogin) return this.dialog.show();
    /* 登录状态 正常跳转 */
    const { name } = e.target.dataset;
    wx.navigateTo({
      url: `/pages/userDetail/userDetail?name=${name}`,
    });
  },

  /* 取消登录 */
  cancel() {
    this.dialog.hide();
  },

  /* 确认登录 */
  confirm() {
    this.dialog.hide();
    wx.navigateTo({
      url: '/pages/login/login',
    });
  },

  /* 生命周期函数--监听页面加载 */
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['isLogin', 'isSigned', 'userInfo'],
      actions: ['setSignState'],
    });
  },

  /* 生命周期函数--监听页面初次渲染完成 */
  onReady() {
    this.dialog = this.selectComponent('#dialog');
  },

  /* 生命周期函数--监听页面卸载 */
  onUnload: function () {
    this.storeBindings.destroyStoreBindings();
  },

  /* 页面相关事件处理函数--监听用户下拉动作 */
  onPullDownRefresh: function () {},
});
