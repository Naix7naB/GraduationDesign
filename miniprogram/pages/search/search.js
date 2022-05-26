import { getDefaulKeyword, getHotList } from '../../service/search';
import { handleAuthor } from '../../utils/index';
import storage from '../../utils/storage';

const app = getApp();

Page({
  /* 页面的初始数据 */
  data: {
    defaultKeyword: '', // 默认展示的搜索词
    defaultRealKeyword: '', // 默认展示真正的搜索关键词
    keyword: '', // 关键词
    searchResult: [],
    historyList: [],
    hotList: [],
  },

  /* 页面初始数据 */
  async getDefaulData() {
    try {
      const list = storage.getLocal('_searchHistory_', []);
      const res = await getDefaulKeyword();
      const { data } = await getHotList();
      const { realkeyword, showKeyword } = res.data;
      this.setData({
        defaultKeyword: showKeyword,
        defaultRealKeyword: realkeyword,
        historyList: list,
        hotList: data,
      });
    } catch (err) {
      console.error(err);
    }
  },

  /* 设置搜索结果 */
  setRes(e) {
    let result = [];
    const _value = e.detail.res;
    if (_value) {
      result = _value;
    }
    this.setData({ searchResult: result });
  },

  /* 点击热搜词 */
  onTap(e) {
    const { idx } = e.currentTarget.dataset;
    const { name } = e.mark;
    let keyword = '';
    if (name === 'hot') {
      const { searchWord } = this.data.hotList[idx];
      keyword = searchWord;
    } else {
      const { result } = this.data.historyList[idx];
      keyword = result;
    }
    this.setData({ keyword });
  },

  /* 清空搜索历史 */
  clear() {
    wx.showModal({
      content: '确定要清空搜索历史吗？',
      success: (res) => {
        if (res.cancel) return;
        this.setData({ historyList: [] });
        storage.setLocal('_searchHistory_', []);
      },
    });
  },

  /* 点击搜索结果 */
  selectRes(e) {
    const { idx } = e.currentTarget.dataset;
    const curItem = this.data.searchResult[idx];
    const list = this.data.historyList;
    const result = curItem.name + '-' + handleAuthor(curItem);
    const curIdx = list.findIndex((item) => item.result === result);
    if (curIdx === -1) {
      list.unshift({ result });
    } else {
      list.unshift(...list.splice(curIdx, 1));
    }
    if (list.length > 10) {
      list.length = 10;
    }
    this.setData({ historyList: list });
    storage.setLocal('_searchHistory_', list);
    app.globalData.curSong = curItem;
    app.setBGM(curItem);
  },

  /* 生命周期函数--监听页面加载 */
  onLoad(options) {
    this.getDefaulData();
  },

  /* 生命周期函数--监听页面初次渲染完成 */
  onReady() {},

  /* 生命周期函数--监听页面卸载 */
  onUnload() {},
});
