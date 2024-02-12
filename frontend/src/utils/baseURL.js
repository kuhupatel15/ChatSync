import axios from 'axios';
const Endpoint = "https://chat-sync-backend-jpn0.onrender.com";


const baseUrl = axios.create({
    baseURL: Endpoint,
});

export default baseUrl;