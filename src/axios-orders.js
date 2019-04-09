import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://burger-react-67152.firebaseio.com/'
})

export default instance;
