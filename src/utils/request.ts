/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-11-27 16:36:58
 * @LastEditTime: 2023-11-29 17:35:43
 * @LastEditors: breeze1307
 */
import axios from 'axios'
import { ElMessage } from 'element-plus';
let http = axios.create({
  baseUrl: import.meta.env.VITE_APP_MOCK_API,
  timeout:5000
})
http.interceptors.request.use(config => {
  return config
})
http.interceptors.response.use((res) => {
  return res.data
}, (error) => {
  let msg = ''
  let status = error.response.status
  switch (status) {
    case 401:
      msg = "token过期";
      break;
    case 403:
      msg = "无权访问";
      break;
    case 404:
      msg = "请求地址错误";
      break;
    case 500:
      msg = "服务器错误"
      break;
    default:
      msg = "无网络";
  }

})
