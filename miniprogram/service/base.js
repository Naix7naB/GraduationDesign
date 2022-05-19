import envList from '../envList';
const { baseUrl } = envList.dev;

export function request(url, ...rest) {
  return new Promise((resolve, reject) => {
    let _data, _method, _type;
    if (!rest.length) {
      _data = {};
      _method = 'GET';
      _type = 'show';
    } else {
      _data = rest[0].data || {};
      _method = rest[0].method || 'GET';
      _type = rest[0].type || 'show';
    }

    if (_type === 'show') {
      /* 请求时显示加载 */
      wx.showLoading({
        title: '正在加载...',
        mask: true,
      });
    }

    const _url = baseUrl + url;
    wx.request({
      url: _url,
      data: _data,
      method: _method,
      timeout: 5000,
      success: ({ data }) => {
        resolve(data);
      },
      fail: (err) => {
        reject(console.error(err));
      },
      complete: () => {
        /* 请求结束时隐藏加载 */
        wx.hideLoading();
      },
    });
  });
}
