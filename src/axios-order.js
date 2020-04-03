import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-build-a-burger-baacb.firebaseio.com/'
});

export default instance;
