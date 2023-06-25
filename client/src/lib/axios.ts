import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://grocer-ease-project-back.vercel.app/',
})
