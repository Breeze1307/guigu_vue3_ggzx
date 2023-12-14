/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-12-05 17:18:57
 * @LastEditTime: 2023-12-14 14:23:27
 * @LastEditors: breeze1307
 */
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}
export const REMOVE_TOKEN = () => {
  return localStorage.removeItem('TOKEN')
}
