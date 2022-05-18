import { request } from './base';

const playlistArr = ['飙升榜', '热歌榜', '云音乐说唱榜', '云音乐欧美热歌榜', '云音乐古风榜'];

/* 获取排行榜 */
function getToplist() {
  return request('/toplist');
}

/* 获取歌单详细 */
async function getPlaylistDetail(item) {
  const { playlist } = await request('/playlist/detail', { id: item.id });
  return playlist;
}

/* 获取歌单 */
export async function getAllPlaylist() {
  const { list } = await getToplist();
  const filterList = list.filter((item) => playlistArr.includes(item.name));
  const promiseArr = filterList.map((item) => getPlaylistDetail(item));
  return Promise.all(promiseArr).then((res) => {
    return res;
  });
}

/* 获取每日推荐歌单歌曲 */
export function getDailyRecommend() {
  return request('/playlist/catlist');
}

/* 获取歌曲url */
export function getMusicUrl(song) {
  return request('/song/url', { id: song.id });
}
