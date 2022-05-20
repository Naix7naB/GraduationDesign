Page({
  /* 页面的初始数据 */
  data: {
    title: '',
    isComponent: '',
  },

  /* 设置页面标题 */
  setTitle(name) {
    let txt = '';
    switch (name) {
      case 'personal':
        txt = '个人中心';
        break;
      case 'point':
        txt = '积分商城';
        break;
      case 'ticket':
        txt = '点歌券';
        break;
      case 'school':
        txt = '选择学校';
        break;
      case 'help':
        txt = '反馈与帮助';
        break;
      case 'about':
        txt = '关于';
        break;
      case 'setting':
        txt = '设置';
        break;
    }
    this.setData({ title: txt, isComponent: name });
  },

  /* 生命周期函数--监听页面加载 */
  onLoad(options) {
    this.setTitle(options.name);
  },

  /* 生命周期函数--监听页面初次渲染完成 */
  onReady() {},

  /* 生命周期函数--监听页面卸载 */
  onUnload() {},
});
