// aula 04 46:00
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.0.2:5000'
})


export default api;