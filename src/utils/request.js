import axios from 'axios'
import router from '../router';
import Vue from 'vue'


const request = axios.create({
  baseURL: 'http://112.74.99.5:3000/web/api/'
})
request.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
  return config
}, err => {
  return Promise.reject(err)
})

request.interceptors.response.use(res => {
  return res
}, error => {
  if (error.response && error.response.status === 401 || error.response.status === 402) {
    // 没有权限，让其跳转到登录页面
    toLogin()
    Vue.prototype.$toast(error.response.data.message)
    return
  }
  return error
})

function toLogin() {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

export default request