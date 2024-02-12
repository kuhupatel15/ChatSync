import axios from 'axios';
const Endpoint = import.meta.env.VITE_BACKEND_URL;


const baseUrl = axios.create({
    baseURL: Endpoint,
});

export default baseUrl;