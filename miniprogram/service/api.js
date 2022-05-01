import { request } from './base'

export function test(){
  return request('/playlist/catlist');
}