import { createStoreBindings } from 'mobx-miniprogram-bindings';
import { store } from '../../utils/store';
import storage from '../../utils/storage';

const app = getApp();

Page({
  /* 页面的初始数据 */
  data: {
    openId: app.globalData.openId,
    orderInfo: [],
  },

  /* 跳转消息详细页面 */
  onTap(e) {
    console.log(e);
  },

  /* 生命周期函数--监听页面加载 */
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['isLogin'],
    });
    wx.showLoading({
      title: '加载中...',
    });
    wx.cloud
      .callFunction({
        name: 'getOrderList',
        data: {
          openId: this.data.openId,
        },
      })
      .then(({ result }) => {
        this.setData({ orderInfo: result.list });
        storage.setLocal('_orderInfo_', result.list);
        wx.hideLoading();
      });
  },

  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },
});
