import { request } from './base';

/* 获取默认搜索词 */
export function getDefaulKeyword() {
  return request('/search/default');
}

/* 获取热搜词 */
export function getHotList() {
  return request('/search/hot/detail');
}

/* 获取搜索结果 */
export function getSearchResult(keywords) {
  return request('/search', {
    data: { keywords },
    type: 'hidden',
  });
}
