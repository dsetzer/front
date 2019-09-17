import axios from 'axios'

let baseURL

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  baseURL = 'https://coincube-back.prod.coincube.io'
} else {
  baseURL = process.env.VUE_APP_API_BASE_URL
}

export const HTTP = axios.create({
  baseURL: baseURL
})
