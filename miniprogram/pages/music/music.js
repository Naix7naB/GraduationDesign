import { createStoreBindings } from 'mobx-miniprogram-bindings';
import { store } from '../../utils/store';
import { getAllPlaylist } from '../../service/toplist';
import { handleAuthor } from '../../utils/index';

const app = getApp();

Page({
  /* 页面的初始数据 */
  data: {
    playlistArr: [],
    song: null,
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

  /* 跳转搜索页面 */
  toSearch() {
    /* 未登录状态 显示弹窗 */
    if (!this.data.isLogin) return this.dialog.show();
    wx.navigateTo({
      url: '/pages/search/search',
    });
  },

  /* 点击歌曲 */
  async selectItem(e) {
    /* 未登录状态 显示弹窗 */
    if (!this.data.isLogin) return this.dialog.show();
    const { item } = e.detail;
    const curSong = app.globalData.curSong;
    if (item === curSong) return;
    app.globalData.curSong = item;
    await app.setBGM(item);
  },

  /* 播放歌曲 */
  play(e) {
    if (e.detail.state) {
      app.bgm.play();
    } else {
      app.bgm.pause();
    }
  },

  /* 添加点歌 */
  add() {
    wx.showModal({
      content: '是否添加点歌?',
      success: (res) => {
        if (res.cancel) return;
        /* 跳转点歌页面 */
        const song = app.globalData.curSong;
        wx.navigateTo({
          url: `/pages/order/order?name=${song.name}&author=${handleAuthor(song)}`,
        });
      },
    });
  },

  /* 生命周期函数--监听页面加载 */
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['musicInfo', 'scrollStyle', 'isLogin'],
      actions: ['setMusicInfo'],
    });
    getAllPlaylist().then((res) => {
      this.setData({ playlistArr: res });
    });
  },

  /* 生命周期函数--监听页面初次渲染完成 */
  onReady() {
    this.dialog = this.selectComponent('#dialog');
  },

  /* 生命周期函数--监听页面卸载 */
  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },

  /* 页面相关事件处理函数--监听用户下拉动作 */
  onPullDownRefresh() {},
});
