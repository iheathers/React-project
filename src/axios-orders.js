import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://react-burger-builder-3de3e.firebaseio.com/'
})

export default axiosInstance;