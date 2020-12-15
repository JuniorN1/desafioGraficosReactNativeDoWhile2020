import axios from 'axios';

const api = axios.create({
    baseURL:'https://economia.awesomeapi.com.br/json/daily/'
});

export default api;