import { createStoreBindings } from 'mobx-miniprogram-bindings';
import { store } from '../../utils/store';
import { getAllPlaylist, getMusicUrl } from '../../service/toplist';
import { handleAuthor } from '../../utils/index';

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
  selectItem(e) {
    /* 未登录状态 显示弹窗 */
    if (!this.data.isLogin) return this.dialog.show();
    const { item } = e.detail;
    if (this.data.song === item) return;
    const info = {
      name: item.name,
      author: handleAuthor(item),
      picUrl: item.al.picUrl,
    };
    getMusicUrl(item).then(({ data }) => {
      this.bgm.title = info.name;
      this.bgm.singer = info.author;
      this.bgm.src = data[0].url;
      this.bgm.play();
      this.setMusicInfo(info);
      this.setData({ song: item });
    });
  },

  /* 播放歌曲 */
  play(e) {
    if (e.detail.state) {
      this.bgm.play();
    } else {
      this.bgm.pause();
    }
  },

  /* 添加点歌 */
  add() {
    const song = this.data.song;
    wx.showModal({
      content: '是否添加点歌?',
      success(res) {
        if (res.cancel) return;
        /* 跳转点歌页面 */
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
      fields: ['musicInfo', 'playState', 'showPlayer', 'scrollStyle', 'isLogin'],
      actions: ['setMusicInfo', 'setPlayState', 'setShowPlayer'],
    });
    getAllPlaylist().then((res) => {
      const list = res.map((item) => {
        return {
          id: item.id,
          title: item.name,
          songs: item.tracks.slice(0, 30),
        };
      });
      this.setData({ playlistArr: list });
    });
  },

  /* 生命周期函数--监听页面初次渲染完成 */
  onReady() {
    this.dialog = this.selectComponent('#dialog');
    this.bgm = wx.getBackgroundAudioManager();
    this.bgm.onPlay(() => {
      this.setPlayState(true);
      this.setShowPlayer(true);
    });
    this.bgm.onPause(() => {
      this.setPlayState(false);
    });
    this.bgm.onEnded(() => {
      this.setShowPlayer(false);
    });
  },

  /* 生命周期函数--监听页面卸载 */
  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },

  /* 页面相关事件处理函数--监听用户下拉动作 */
  onPullDownRefresh() {},
});
