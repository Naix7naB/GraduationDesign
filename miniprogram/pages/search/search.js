import { getSearchResult, getDefaulKeyword, getHotList } from '../../service/search';

Page({
  /* 页面的初始数据 */
  data: {
    defaultKeyword: '',
    showKeyword: '',
    realKeyword: '',
    searchResult: [],
    historyList: [],
    hotList: [],
  },

  /* 搜索 */
  async search(e) {
    const { value } = e.detail;
    const { result } = await getSearchResult(value);
    this.setData({ searchResult: result.songs });
  },

  /* 清空搜索历史 */
  clear() {
    console.log(this.data);
  },

  /* 点击热搜词 */
  onTap(e) {
    const { idx } = e.currentTarget.dataset;
    const { searchWord } = this.data.hotList[idx];
    this.setData({
      showKeyword: searchWord,
      realKeyword: searchWord,
    });
  },

  /* 页面初始数据 */
  async getDefaulData() {
    try {
      const res = await getDefaulKeyword();
      const { data } = await getHotList();
      const { realkeyword, showKeyword } = res.data;
      this.setData({
        realKeyword: realkeyword,
        defaultKeyword: showKeyword,
        hotList: data,
      });
    } catch (err) {
      console.error(err);
    }
  },

  /* 生命周期函数--监听页面加载 */
  onLoad(options) {
    this.getDefaulData();
  },

  /* 生命周期函数--监听页面初次渲染完成 */
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
