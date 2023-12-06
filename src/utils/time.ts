/*
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-12-06 16:12:47
 * @LastEditTime: 2023-12-06 16:12:57
 * @LastEditors: breeze1307
 */
export const getTime = () => {
  let message = ''
  let hours = new Date().getHours()
  if (hours <= 9) {
    message = '早上'
  } else if (hours <= 12) {
    message = '上午'
  } else if (hours <= 18) {
    message = '下午'
  } else {
    message = '晚上'
  }
  return message
}
