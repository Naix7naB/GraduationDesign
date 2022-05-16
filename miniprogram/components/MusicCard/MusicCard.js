import { getFilePath } from '../../utils/index';

Component({
  /* 组件的选项配置 */
  options: {
    addGlobalClass: true,
    virtualHost: true,
  },

  externalClasses: ['custom-class'],

  /* 组件的属性列表 */
  properties: {
    list: {
      type: Object,
      value: null,
      observer(newVal) {
        let title = '';
        switch (newVal.name) {
          case '飙升榜':
            title = '飙升歌曲';
            break;
          case '热歌榜':
            title = '热门推荐';
            break;
          case '云音乐说唱榜':
            title = '说唱推荐';
            break;
          case '云音乐欧美热歌榜':
            title = '欧美歌曲';
            break;
          case '云音乐古风榜':
            title = '悠韵古风';
            break;
        }
        const { tracks, trackIds } = newVal;
        const _list_ = [];
        const arr = tracks.slice(0, 12);
        console.log(arr.length);
        // for (let i = 0; i < arr.length; i + 3) {
        // console.log(i);
        // _list_.push(arr.slice(0, 3));
        // }
        // this.setData({
        //   title,
        //   musicIds: trackIds.slice(0, 12),
        // });
      },
    },
  },

  /* 组件的初始数据 */
  data: {
    title: '',
    musicList: [],
    musicIds: [],
  },

  /* 组件的方法列表 */
  methods: {},
});
