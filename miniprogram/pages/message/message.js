import storage from '../../utils/storage';

const app = getApp();

Page({
  /* 页面的初始数据 */
  data: {
    openId: app.globalData.openId,
    isLogin: false,
    orderInfo: [],
  },

  /* 跳转消息详细页面 */
  onTap(e) {
    const { idx } = e.currentTarget.dataset;
    const item = this.data.orderInfo[idx];
    wx.navigateTo({
      url: `/pages/messageDetail/messageDetail?detail=${JSON.stringify(item)}`,
    });
  },

  /* 生命周期函数--监听页面加载 */
  onLoad(options) {
    const isLogout = storage.getLocal('_isLogout_');
    if (isLogout) return;
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
        const list = result.list.reverse();
        console.log(result, list);
        this.setData({ isLogin: !isLogout, orderInfo: list });
        storage.setLocal('_orderInfo_', list);
        wx.hideLoading();
      });
  },
});
