/* 获取资源url */
export async function getFilePath(name = 'lyun') {
  const base = 'cloud://naixnab-5g2whrh799a6162e.6e61-naixnab-5g2whrh799a6162e-1311602487/images/';
  const fileName = `${name}.png`;
  const fileID = base + fileName;

  let result;
  try {
    const { tempFilePath } = await wx.cloud.downloadFile({ fileID });
    result = tempFilePath;
  } catch (err) {
    result = null;
    console.error(err);
  }

  return {
    url: result,
  };
}

/* 格式化日期 */
export function formatTime(delta) {
  const curDay = new Date();
  const timestamp = curDay.setDate(new Date().getDate() + delta);
  const _time_ = new Date(timestamp);
  const YY = _time_.getFullYear() + '';
  const MM = (_time_.getMonth() + 1 + '').padStart(2, '0');
  const DD = (_time_.getDate() + '').padStart(2, '0');
  return {
    timestamp,
    date: `${YY}-${MM}-${DD}`,
  };
}

/* 处理作者项 */
export function handleAuthor(item) {
  const ar = item.ar || item.artists;
  const arList = ar.map((item) => item.name);
  return arList.join('/');
}
