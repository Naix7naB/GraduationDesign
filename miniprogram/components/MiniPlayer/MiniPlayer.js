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
  data: {},

  /* store */
  storeBindings: {
    store,
    fields: ['musicInfo', 'playState', 'showPlayer', 'playIcon'],
    actions: ['setPlayState', 'setShowPlayer'],
  },

  observers: {
    playState(state) {
      this.triggerEvent('setState', { state });
    },
  },

  /* 组件的方法列表 */
  methods: {
    /* 显示播放器 */
    show() {
      this.setShowPlayer(true);
    },
    /* 隐藏播放器 */
    hide() {
      this.setShowPlayer(false);
    },
    /* 播放歌曲 */
    play() {
      this.setPlayState(!this.data.playState);
    },
    /* 添加点歌 */
    add() {
      this.triggerEvent('setOrder');
    },
  },
});
