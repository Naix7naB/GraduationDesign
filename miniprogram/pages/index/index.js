import { createStoreBindings } from 'mobx-miniprogram-bindings';
import { store } from '../../utils/store';
import { getFilePath } from '../../utils/index';
import storage from '../../utils/storage';

Page({
  /* 页面的初始数据 */
  data: {
    picUrl: '',
  },

  /* 取消登录 */
  cancel() {
    this.dialog.hide();
  },

  /* 确认登录 */
  confirm() {
    this.dialog.show();
    wx.navigateTo({
      url: '/pages/login/login',
    });
  },

  /* 跳转点歌页面 */
  toOrdering() {
    /* 未登录状态 显示弹窗 */
    if (!this.data.isLogin) return this.dialog.show();
    wx.navigateTo({
      url: '/pages/order/order',
    });
  },

  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['isLogin','userInfo'],
    });
    const url = storage.getLocal('_defaultPic_', '');
    if (url) {
      this.setData({ picUrl: url });
    } else {
      getFilePath('SpongeBob').then(({ url }) => {
        this.setData({ picUrl: url });
        storage.setLocal('_defaultPic_', url);
      });
    }
  },

  /* 生命周期函数--监听页面初次渲染完成 */
  onReady() {
    this.dialog = this.selectComponent('#dialog');
  },

  /* 页面相关事件处理函数--监听用户下拉动作 */
  onPullDownRefresh() {},
});
