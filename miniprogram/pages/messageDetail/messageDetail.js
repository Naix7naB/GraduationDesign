import { createStoreBindings } from 'mobx-miniprogram-bindings';
import { store } from '../../utils/store';

Page({
  /* 页面的初始数据 */
  data: {
    detail: {},
    steps: [
      {
        text: '提交',
        desc: '提交点歌信息',
      },
      {
        text: '处理中',
        desc: '等待管理员处理',
      },
      {
        text: '完成',
        desc: '点歌成功',
      },
    ],
    active: 1,
  },

  /* 删除点歌 */
  deleteOrdered() {
    wx.showModal({
      title: '确认删除',
      content:
        '此操作无法撤销，如果此歌曲为付费点歌，删除后款项不会退还，请自行与广播站联系进行退款。',
      success: (res) => {
        if (res.cancel) return;
        wx.cloud
          .callFunction({
            name: 'removeOneOrder',
            data: { _id: this.data.detail._id },
          })
          .then(({ result }) => {
            if (!result.removed) {
              wx.showToast({
                icon: 'none',
                title: '删除失败',
              });
            } else {
              wx.reLaunch({
                url: '/pages/message/message',
                success() {
                  wx.showToast({
                    title: '删除成功',
                  });
                },
              });
            }
          });
      },
    });
  },

  /* 生命周期函数--监听页面加载 */
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['userInfo'],
    });
    const item = JSON.parse(options.detail);
    this.setData({ detail: item });
  },

  /* 生命周期函数--监听页面卸载 */
  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },
});
