import { storeBindingsBehavior } from 'mobx-miniprogram-bindings';
import { store } from '../../utils/store';

Component({
  behaviors: [storeBindingsBehavior],
  /* 组件的选项配置 */
  options: {
    addGlobalClass: true,
    virtualHost: true,
  },

  /* 组件的属性列表 */
  properties: {},

  /* 组件的初始数据 */
  data: {
    visible: false,
  },

  /* store */
  storeBindings: {
    store,
    fields: ['musicInfo'],
  },

  /* 组件的方法列表 */
  methods: {
    show() {
      this.setData({ visible: true });
    },
    hide() {
      this.setData({ visible: false });
    },
  },
});
