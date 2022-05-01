import envList from '../envList';
const { baseUrl } = envList.dev;

export function request(url, data = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    /* 请求时显示加载 */
    wx.showLoading({
      title: '正在加载...',
      mask: true,
    });

    const _url = baseUrl + url;
    wx.request({
      url: _url,
      data: data,
      method: method,
      timeout: 5000,
      success: ({ data }) => {
        const { code } = data;
        if (code >= 400) {
          reject(new Error(data.msg));
        } else {
          resolve(data);
        }
      },
      fail: (err) => {
        reject(new Error(err));
      },
      complete: () => {
        /* 请求结束时隐藏加载 */
        wx.hideLoading();
      },
    });
  });
}
