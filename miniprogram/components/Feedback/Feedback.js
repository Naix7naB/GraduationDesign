const app = getApp();

Component({
  /* 组件的选项配置 */
  options: {
    addGlobalClass: true,
    virtualHost: true,
  },

  /* 组件的属性列表 */
  properties: {},

  /* 组件的初始数据 */
  data: {
    openId: app.globalData.openId,
    feedback: '',
    contact: '',
  },

  /* 组件的方法列表 */
  methods: {
    /* 输入内容 */
    onInput(e) {
      const { name } = e.currentTarget.dataset;
      const content = e.detail.value.trim();
      if (name === 'feedback') {
        this.data.feedback = content;
      } else {
        this.data.contact = content;
      }
    },
    /* 提交反馈 */
    onSubmit() {
      if (!this.data.contact) {
        wx.showToast({
          icon: 'none',
          title: '联系方式不能为空',
        });
        return;
      }
      const submitContent = {
        openId: this.data.openId,
        content: this.data.feedback,
        contact: this.data.contact,
      };
      wx.cloud
        .callFunction({
          name: 'submitFeedback',
          data: submitContent,
        })
        .then(() => {
          wx.reLaunch({
            url: '/pages/user/user',
            success() {
              wx.showToast({
                title: '提交成功',
              });
            },
          });
        });
    },
  },
});
