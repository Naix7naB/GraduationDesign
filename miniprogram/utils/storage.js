const storage = {
  getLocal(key, type) {
    let result;
    const data = wx.getStorageSync(key);
    if (type === undefined) {
      type = null;
    }
    result = data ? data : type;
    return result;
  },
  setLocal(key, val) {
    wx.setStorageSync(key, val);
  },
  removeLocal(key) {
    const { keys } = wx.getStorageInfoSync();
    const idx = keys.findIndex((k) => k === key);
    if (idx === -1) {
      console.error('本地存储没有该数据');
      return;
    } else {
      wx.removeStorageSync(key);
    }
  },
  clearLocal() {
    const { keys } = wx.getStorageInfoSync();
    if (!keys.length) {
      console.error('本地存储没有数据');
      return;
    } else {
      wx.clearStorageSync();
    }
  },
};

export default storage;
