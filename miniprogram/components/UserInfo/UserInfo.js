import { storeBindingsBehavior } from 'mobx-miniprogram-bindings';
import { store } from '../../utils/store';

Component({
  behaviors: [storeBindingsBehavior],

  /* 组件的选项 */
  options: {
    addGlobalClass: true,
    virtualHost: true,
  },

  /* 组件的属性列表 */
  properties: {
    isLogin: Boolean,
    userInfo: null,
  },

  /* 组件的初始数据 */
  data: {},

  /* store */
  storeBindings: {
    store,
    fields: ['isSigned'],
  },

  /* 组件的方法列表 */
  methods: {
    /* 点击头像 */
    onTap(e) {
      const { name } = e.currentTarget.dataset;
      this.triggerEvent('tapEvent', { name });
    },
    /* 签到 */
    onSign() {
      if (this.data.userInfo) {
        const { point } = this.data.userInfo;
        this.triggerEvent('sign', { point });
      } else {
        this.triggerEvent('sign', { point: null });
      }
    },
  },
});
