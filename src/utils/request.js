import axios from 'axios'
const request = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: '2000',
    // withCredentials:true,
})
request.interceptors.request.use((config) => {
    return config
})
request.interceptors.response.use((res) => {
    return res
})
// 导出
export default request