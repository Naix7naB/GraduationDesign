import { createStoreBindings } from 'mobx-miniprogram-bindings';
import { store } from '../../utils/store';
import { getAllPlaylist, getMusicUrl } from '../../service/toplist';
import { handleAuthor } from '../../utils/index';

Page({
  /* 页面的初始数据 */
  data: {
    playlistArr: [],
  },

  /* 跳转搜索页面 */
  toSearch() {
    wx.navigateTo({
      url: '/pages/search/search',
    });
  },

  /* 点击歌曲 */
  selectItem(e) {
    const miniPlayer = this.selectComponent('#miniPlayer');
    const { item } = e.detail;
    const info = {
      name: item.name,
      author: handleAuthor(item),
      picUrl: item.al.picUrl,
    };
    miniPlayer.show();
    this.setMusicInfo(info);
    this.setScrollStyle('height: calc(100vh - 260rpx);');
    getMusicUrl(item).then(({ data }) => {
      this.audio.name = info.name;
      this.audio.author = info.author;
      this.audio.src = data[0].url;
      this.audio.play();
    });
  },

  /* 生命周期函数--监听页面加载 */
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['musicInfo', 'scrollStyle'],
      actions: ['setMusicInfo', 'setScrollStyle'],
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
    this.audio = wx.createInnerAudioContext();
  },

  /* 生命周期函数--监听页面卸载 */
  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },

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
