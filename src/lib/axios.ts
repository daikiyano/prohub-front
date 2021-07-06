
import axios from 'axios'
const development = process.env.NODE_ENV !== 'production'
export default axios.create({
  baseURL: development ? 'http://localhost:3000/' : 'https://domain/api'
})
