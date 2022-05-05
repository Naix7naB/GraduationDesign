import { formatTime } from '../../utils/index';

const schedule = {
  day: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  time: ['中午', '傍晚'],
};

Page({
  /* 页面的初始数据 */
  data: {
    visible: false,
    columns: [],
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
    const showDate = formatTime(delta) + ' ' + e.detail.value.join('');
    this.setData({ showDate });
    this.hide();
  },

  /* 提交点歌信息 */
  submit(e) {
    const info = e.detail.value;
    console.log(info);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const idx = new Date().getDay() - 1;
    const days = schedule.day;
    const time = schedule.time;
    days.push(...days.splice(0, idx));
    this.setData({ columns: [{ values: days }, { values: time }] });
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