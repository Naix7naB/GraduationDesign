import { createStoreBindings } from 'mobx-miniprogram-bindings';
import { store } from './utils/store';
import { getMusicUrl } from './service/toplist';
import { handleAuthor } from './utils/index';
import storage from './utils/storage';
import './miniprogram_npm/weapp-cookie/index';

App({
  /* 当小程序初始化完成时，会触发 onLaunch（全局只触发一次） */
  onLaunch: function () {
    /* 初始化云函数 */
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init();
    }

    /* store */
    this.storeBindings = createStoreBindings(this, {
      store,
      actions: ['setLoginState', 'setPlayState', 'setUserInfo', 'setMusicInfo', 'setShowPlayer'],
    });

    /* 获取用户openid */
    let id = storage.getLocal('_OPENID_', null);
    if (id) {
      this.globalData.openId = id;
    } else {
      wx.cloud.callFunction({ name: 'getOpenId' }).then(({ result }) => {
        this.globalData.openId = id = result.openid;
        storage.setLocal('_OPENID_', result.openid);
      });
    }

    const isLogout = storage.getLocal('_isLogout_');
    if (!isLogout) {
      /* 查询用户在数据库是否存在 */
      wx.cloud.callFunction({
        name: 'queryUser',
        data: { openId: id },
        success: ({ result }) => {
          if (!result.userInfo) return;
          /* 用户之前登录过 */
          this.setLoginState(true);
          this.setUserInfo(result.userInfo);
        },
      });
    }

    /* 获取系统信息 */
    const systemInfo = wx.getSystemInfoSync();
    /* 获取胶囊位置信息 */
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    /* 手机状态栏高度 */
    const { statusBarHeight, screenWidth } = systemInfo;
    const _height_ =
      (menuButtonInfo.top - statusBarHeight) * 2 + menuButtonInfo.bottom - statusBarHeight;

    this.globalData.navHeight = statusBarHeight + _height_;
    this.globalData.menuWidth = menuButtonInfo.width;
    this.globalData.menuHeight = menuButtonInfo.height;
    this.globalData.menuTop = menuButtonInfo.top;
    this.globalData.menuRight = screenWidth - menuButtonInfo.right;

    this.bgm = wx.getBackgroundAudioManager();
    /* 歌曲开始播放时 */
    this.bgm.onPlay(() => {
      this.setPlayState(true);
      this.setShowPlayer(true);
    });
    /* 歌曲暂停播放时 */
    this.bgm.onPause(() => {
      this.setPlayState(false);
    });
    /* 歌曲播放结束时 */
    this.bgm.onEnded(() => {
      this.setPlayState(false);
      this.setShowPlayer(false);
    });
  },

  onUnlauch: function () {
    this.storeBindings.destroyStoreBindings();
  },

  /* 设置背景音乐 */
  setBGM: async function (item) {
    const info = {
      name: item.name,
      author: handleAuthor(item),
      picUrl: item.al.picUrl,
    };
    const { data } = await getMusicUrl(item);
    this.bgm.title = info.name;
    this.bgm.singer = info.author;
    this.bgm.src = data[0].url;
    this.bgm.play();
    this.setMusicInfo(info);
  },

  /* 全局变量 */
  globalData: {
    /* 用户 OPENID */
    openId: '',
    /* 当前播放歌曲 */
    curSong: null,
    /* 歌曲播放状态 */
    playState: false,
    /* 展示播放器 */
    showPlayer: false,
    /* 导航栏高度 */
    navHeight: 0,
    /* 胶囊宽度 */
    menuWidth: 0,
    /* 胶囊高度 */
    menuHeight: 0,
    /* 胶囊距导航栏的 top 值 */
    menuTop: 0,
    /* 胶囊距导航栏的 right 值 */
    menuRight: 0,
  },
});
