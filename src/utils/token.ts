/*
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-12-05 17:18:57
 * @LastEditTime: 2023-12-05 17:23:52
 * @LastEditors: breeze1307
 */
export const SET_TOKEN = (token:string) => {
    localStorage.setItem('TOKEN',token)
}
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}