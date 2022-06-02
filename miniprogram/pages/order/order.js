import { formatTime } from '../../utils/index';
import storage from '../../utils/storage';

const app = getApp();

const schedule = {
  day: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  time: ['中午', '傍晚'],
};

Page({
  /* 页面的初始数据 */
  data: {
    visible: false,
    columns: [],
    name: '',
    author: '',
    showDate: '',
  },

  /* 显示选择器 */
  show() {
    this.setData({ visible: true });
  },

  /* 隐藏选择器 */
  hide() {
    this.setData({ visible: false });
  },

  /* 确认选择 */
  confirm(e) {
    const delta = e.detail.index[0];
    const dateObj = formatTime(delta);
    const showDate = dateObj.date + ' ' + e.detail.value.join('');
    this.setData({ showDate });
    this.hide();
  },

  /* 跳转消息页面 */
  toMessage() {
    wx.reLaunch({
      url: `/pages/message/message`,
      success() {
        wx.showToast({
          title: '点歌成功',
        });
      },
    });
  },

  /* 点歌 */
  async order(info, isPay) {
    info.isPay = isPay;
    const { result } = await wx.cloud.callFunction({
      name: 'submitInfo',
      data: info,
    });
    return result;
  },

  /* 提交点歌信息 */
  submit(e) {
    const info = e.detail.value;
    if (!info.song || !info.singer || !info.ordering || !info.chooseDate) {
      wx.showToast({
        icon: 'none',
        title: '信息不完整,请重新填写',
      });
    } else {
      info.openId = app.globalData.openId;
      info.submitDate = new Date().getTime();
      this.order(info, false).then((res) => {
        if (res.type === 'success') {
          this.toMessage();
        } else {
          wx.showModal({
            title: `${res.msg}`,
            content: '是否使用支付/点歌券点歌',
            success: (res) => {
              if (res.cancel) return;
              wx.showModal({
                title: '确认支付',
                content: '支付优先使用点歌券',
                success: (res) => {
                  if (res.cancel) {
                    wx.showToast({
                      icon: 'none',
                      title: '您已取消支付',
                    });
                  } else {
                    this.order(info, true);
                    this.toMessage();
                  }
                },
              });
            },
          });
        }
      });
    }
  },

  /* 生命周期函数--监听页面加载*/
  onLoad(options) {
    const idx = new Date().getDay() - 1;
    const days = schedule.day;
    const time = schedule.time;
    days.push(...days.splice(0, idx));
    this.setData({ columns: [{ values: days }, { values: time }] });
    if (options.name && options.author) {
      this.setData({
        name: options.name,
        author: options.author,
      });
    }
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
