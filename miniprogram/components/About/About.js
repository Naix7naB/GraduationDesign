import { getFilePath } from '../../utils/index';
import storage from '../../utils/storage';

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
    picUrl: '',
  },

  /* 组件的方法列表 */
  methods: {},

  /* 组件的方法列表 */
  lifetimes: {
    attached() {
      const signaturePic = storage.getLocal('_signaturePic_', '');
      if (signaturePic) {
        this.setData({ picUrl: signaturePic });
      } else {
        getFilePath('lyun').then(({ url }) => {
          this.setData({ picUrl: url });
          storage.setLocal('_signaturePic_', url);
        });
      }
    },
  },
});
